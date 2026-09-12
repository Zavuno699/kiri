package flutterwave

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"sync"
	"time"
)

const tokenURL = "https://idp.flutterwave.com/realms/flutterwave/protocol/openid-connect/token"

var (
	ErrInvalidConfig       = errors.New("invalid flutterwave configuration")
	ErrAuthentication      = errors.New("flutterwave authentication failed")
	ErrProviderResponse    = errors.New("flutterwave provider response error")
	ErrMalformedResponse   = errors.New("malformed flutterwave response")
	ErrInvalidPaymentInput = errors.New("invalid payment input")
)

type Config struct {
	BaseURL      string
	ClientID     string
	ClientSecret string
	Timeout      time.Duration
}

type Client struct {
	baseURL      string
	clientID     string
	clientSecret string
	httpClient   *http.Client

	mu                sync.Mutex
	cachedAccessToken string
	tokenExpiry       time.Time
}

type tokenResponse struct {
	AccessToken string `json:"access_token"`
	ExpiresIn   int    `json:"expires_in"`
	TokenType   string `json:"token_type"`
}

type apiEnvelope struct {
	Status  string          `json:"status"`
	Message string          `json:"message"`
	Data    json.RawMessage `json:"data"`
	Error   json.RawMessage `json:"error"`
}

type customerRequest struct {
	Email string         `json:"email"`
	Phone customerPhone  `json:"phone"`
	Meta  map[string]any `json:"meta,omitempty"`
}

type customerPhone struct {
	CountryCode string `json:"country_code"`
	Number      string `json:"number"`
}

type paymentMethodRequest struct {
	Type       string              `json:"type"`
	CustomerID string              `json:"customer_id,omitempty"`
	Mobile     *mobileMoneyRequest `json:"mobile_money,omitempty"`
}

type mobileMoneyRequest struct {
	Network     string `json:"network"`
	CountryCode string `json:"country_code"`
	PhoneNumber string `json:"phone_number"`
}

type chargeRequest struct {
	Reference       string         `json:"reference"`
	Currency        string         `json:"currency"`
	CustomerID      string         `json:"customer_id"`
	PaymentMethodID string         `json:"payment_method_id"`
	Amount          int64          `json:"amount"`
	Meta            map[string]any `json:"meta,omitempty"`
}

type customerResponse struct {
	ID string `json:"id"`
}

type paymentMethodResponse struct {
	ID string `json:"id"`
}

type chargeResponse struct {
	ID        string  `json:"id"`
	Amount    float64 `json:"amount"`
	Currency  string  `json:"currency"`
	Status    string  `json:"status"`
	Reference string  `json:"reference"`
}

func NewClient(cfg Config) (*Client, error) {
	if strings.TrimSpace(cfg.BaseURL) == "" {
		return nil, fmt.Errorf("%w: base URL is required", ErrInvalidConfig)
	}

	if _, err := url.ParseRequestURI(cfg.BaseURL); err != nil {
		return nil, fmt.Errorf("%w: invalid base URL: %v", ErrInvalidConfig, err)
	}

	if strings.TrimSpace(cfg.ClientID) == "" {
		return nil, fmt.Errorf("%w: client ID is required", ErrInvalidConfig)
	}

	if strings.TrimSpace(cfg.ClientSecret) == "" {
		return nil, fmt.Errorf("%w: client secret is required", ErrInvalidConfig)
	}

	if cfg.Timeout <= 0 {
		cfg.Timeout = 15 * time.Second
	}

	return &Client{
		baseURL:      strings.TrimRight(cfg.BaseURL, "/"),
		clientID:     cfg.ClientID,
		clientSecret: cfg.ClientSecret,
		httpClient: &http.Client{
			Timeout: cfg.Timeout,
		},
	}, nil
}

func (c *Client) accessToken(ctx context.Context) (string, error) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if c.cachedAccessToken != "" && time.Now().Before(c.tokenExpiry) {
		return c.cachedAccessToken, nil
	}

	form := url.Values{}
	form.Set("client_id", c.clientID)
	form.Set("client_secret", c.clientSecret)
	form.Set("grant_type", "client_credentials")

	req, err := http.NewRequestWithContext(
		ctx,
		http.MethodPost,
		tokenURL,
		strings.NewReader(form.Encode()),
	)
	if err != nil {
		return "", fmt.Errorf("%w: create token request: %v", ErrAuthentication, err)
	}

	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("%w: token request failed: %v", ErrAuthentication, err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(io.LimitReader(resp.Body, 1<<20))
	if err != nil {
		return "", fmt.Errorf("%w: read token response: %v", ErrAuthentication, err)
	}

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return "", fmt.Errorf(
			"%w: token endpoint returned HTTP %d",
			ErrAuthentication,
			resp.StatusCode,
		)
	}

	var token tokenResponse
	if err := json.Unmarshal(body, &token); err != nil {
		return "", fmt.Errorf("%w: decode token response: %v", ErrAuthentication, err)
	}

	if strings.TrimSpace(token.AccessToken) == "" {
		return "", fmt.Errorf("%w: token response contained no access token", ErrAuthentication)
	}

	if token.ExpiresIn <= 0 {
		return "", fmt.Errorf("%w: token response contained invalid expiry", ErrAuthentication)
	}

	c.cachedAccessToken = token.AccessToken

	// Refresh slightly before the provider's actual expiry.
	refreshWindow := 30 * time.Second
	lifetime := time.Duration(token.ExpiresIn) * time.Second

	if lifetime > refreshWindow {
		c.tokenExpiry = time.Now().Add(lifetime - refreshWindow)
	} else {
		c.tokenExpiry = time.Now().Add(lifetime / 2)
	}

	return c.cachedAccessToken, nil
}

func (c *Client) getJSON(
	ctx context.Context,
	path string,
	traceID string,
) (apiEnvelope, *http.Response, error) {
	result, statusCode, err := c.doJSON(
		ctx,
		http.MethodGet,
		path,
		nil,
		"",
		traceID,
	)
	if err != nil {
		return apiEnvelope{}, nil, err
	}

	return result, &http.Response{
		StatusCode: statusCode,
	}, nil
}

func (c *Client) doJSON(
	ctx context.Context,
	method string,
	path string,
	body any,
	idempotencyKey string,
	traceID string,
) (apiEnvelope, int, error) {
	token, err := c.accessToken(ctx)
	if err != nil {
		return apiEnvelope{}, 0, err
	}

	payload, err := json.Marshal(body)
	if err != nil {
		return apiEnvelope{}, 0, fmt.Errorf("%w: encode request: %v", ErrInvalidPaymentInput, err)
	}

	req, err := http.NewRequestWithContext(
		ctx,
		method,
		c.baseURL+path,
		bytes.NewReader(payload),
	)
	if err != nil {
		return apiEnvelope{}, 0, fmt.Errorf("%w: create request: %v", ErrProviderResponse, err)
	}

	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	if idempotencyKey != "" {
		req.Header.Set("X-Idempotency-Key", idempotencyKey)
	}

	if traceID != "" {
		req.Header.Set("X-Trace-Id", traceID)
	}

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return apiEnvelope{}, 0, fmt.Errorf("%w: HTTP request failed: %v", ErrProviderResponse, err)
	}
	defer resp.Body.Close()

	raw, err := io.ReadAll(io.LimitReader(resp.Body, 2<<20))
	if err != nil {
		return apiEnvelope{}, resp.StatusCode, fmt.Errorf(
			"%w: read response: %v",
			ErrProviderResponse,
			err,
		)
	}

	var envelope apiEnvelope

	if len(raw) > 0 {
		if err := json.Unmarshal(raw, &envelope); err != nil {
			return apiEnvelope{}, resp.StatusCode, fmt.Errorf(
				"%w: decode response: %v",
				ErrMalformedResponse,
				err,
			)
		}
	}

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return envelope, resp.StatusCode, fmt.Errorf(
			"%w: HTTP %d: %s",
			ErrProviderResponse,
			resp.StatusCode,
			strings.TrimSpace(envelope.Message),
		)
	}

	if strings.TrimSpace(envelope.Status) == "" {
		return apiEnvelope{}, resp.StatusCode, fmt.Errorf(
			"%w: missing provider status",
			ErrMalformedResponse,
		)
	}

	return envelope, resp.StatusCode, nil
}
