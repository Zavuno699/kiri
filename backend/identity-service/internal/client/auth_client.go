package client

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type Principal struct {
	Subject     string
	TenantID    string
	Roles       []string
	Permissions []string
}

type AuthClient struct {
	baseURL    string
	httpClient *http.Client
}

func NewAuthClient(baseURL string) *AuthClient {
	return &AuthClient{
		baseURL: baseURL,
		httpClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

func (c *AuthClient) Authenticate(ctx context.Context, token string) (Principal, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, c.baseURL+"/authenticate", nil)
	if err != nil {
		return Principal{}, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Authorization", token)
	req.Header.Set("Content-Type", "application/json")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return Principal{}, fmt.Errorf("failed to call security-service: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return Principal{}, fmt.Errorf("authentication failed: status %d", resp.StatusCode)
	}

	var authResp struct {
		Subject       string `json:"subject"`
		Authenticated bool   `json:"authenticated"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&authResp); err != nil {
		return Principal{}, fmt.Errorf("failed to decode response: %w", err)
	}

	if !authResp.Authenticated {
		return Principal{}, fmt.Errorf("authentication failed")
	}

	return Principal{
		Subject: authResp.Subject,
	}, nil
}
