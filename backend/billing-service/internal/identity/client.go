package identity

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/kirilock/backend/billing-service/internal/middleware"
)

// Client is an internal client for calling identity-service
type Client struct {
	baseURL    string
	httpClient *http.Client
}

// NewClient creates a new identity-service client
func NewClient(baseURL string) *Client {
	return &Client{
		baseURL: baseURL,
		httpClient: &http.Client{
			Timeout: 5 * time.Second,
		},
	}
}

// IdentityServiceResponse represents the response from identity-service /me
type IdentityServiceResponse struct {
	SubjectID    string   `json:"subject_id"`
	Email        string   `json:"email"`
	Roles        []string `json:"roles"`
	IsAdmin      bool     `json:"is_admin"`
	IsSuperAdmin bool     `json:"is_super_admin"`
}

// PaymentResponsibilityResponse represents the response from identity-service internal endpoint
type PaymentResponsibilityResponse struct {
	ID                      uuid.UUID `json:"id"`
	TenantSubjectID         uuid.UUID `json:"tenant_subject_id"`
	PaymentAccountID        uuid.UUID `json:"payment_account_id"`
	TenancyID               uuid.UUID `json:"tenancy_id"`
	Status                  string    `json:"status"`
	ResponsibleForRent      bool      `json:"responsible_for_rent"`
	ResponsibleForUtilities bool      `json:"responsible_for_utilities"`
	ResponsibleForFees      bool      `json:"responsible_for_fees"`
	MonthlyRentAmountMinor  int64     `json:"monthly_rent_amount_minor"`
	Notes                   string    `json:"notes"`
	CreatedAt               string    `json:"created_at"`
	UpdatedAt               string    `json:"updated_at"`
	PaymentAccountProvider  string    `json:"payment_account_provider"`
	PaymentAccountStatus    string    `json:"payment_account_status"`
}

// IdentityClient is the interface for session validation and responsibility resolution
type IdentityClient interface {
	ValidateSession(ctx context.Context, sessionID string) (middleware.AuthenticatedSubject, error)
	ResolvePaymentResponsibility(ctx context.Context, sessionID string, responsibilityID uuid.UUID) (PaymentResponsibilityResponse, error)
}

// ValidateSession validates a session by calling identity-service /me
// Returns the authenticated subject with roles, or an error if validation fails
func (c *Client) ValidateSession(ctx context.Context, sessionID string) (middleware.AuthenticatedSubject, error) {
	if sessionID == "" {
		return middleware.AuthenticatedSubject{}, errors.New("session ID is required")
	}

	req, err := http.NewRequestWithContext(ctx, "GET", c.baseURL+"/me", nil)
	if err != nil {
		return middleware.AuthenticatedSubject{}, fmt.Errorf("create request: %w", err)
	}

	req.Header.Set("Authorization", sessionID)

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return middleware.AuthenticatedSubject{}, fmt.Errorf("call identity-service: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusUnauthorized {
		return middleware.AuthenticatedSubject{}, errors.New("invalid session")
	}

	if resp.StatusCode != http.StatusOK {
		return middleware.AuthenticatedSubject{}, fmt.Errorf("identity-service returned status %d", resp.StatusCode)
	}

	var response IdentityServiceResponse
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return middleware.AuthenticatedSubject{}, fmt.Errorf("decode response: %w", err)
	}

	if response.SubjectID == "" {
		return middleware.AuthenticatedSubject{}, errors.New("invalid subject in response")
	}

	return middleware.AuthenticatedSubject{
		SubjectID:    response.SubjectID,
		Email:        response.Email,
		Roles:        response.Roles,
		IsAdmin:      response.IsAdmin,
		IsSuperAdmin: response.IsSuperAdmin,
	}, nil
}

// ResolvePaymentResponsibility resolves a payment responsibility by calling identity-service internal endpoint
// Returns the responsibility with tenant/account details for ownership derivation
func (c *Client) ResolvePaymentResponsibility(ctx context.Context, sessionID string, responsibilityID uuid.UUID) (PaymentResponsibilityResponse, error) {
	if responsibilityID == uuid.Nil {
		return PaymentResponsibilityResponse{}, errors.New("responsibility ID is required")
	}

	req, err := http.NewRequestWithContext(ctx, "GET", c.baseURL+"/internal/payment-responsibilities?id="+responsibilityID.String(), nil)
	if err != nil {
		return PaymentResponsibilityResponse{}, fmt.Errorf("create request: %w", err)
	}

	req.Header.Set("Authorization", sessionID)

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return PaymentResponsibilityResponse{}, fmt.Errorf("call identity-service: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusNotFound {
		return PaymentResponsibilityResponse{}, errors.New("payment responsibility not found")
	}

	if resp.StatusCode != http.StatusOK {
		return PaymentResponsibilityResponse{}, fmt.Errorf("identity-service returned status %d", resp.StatusCode)
	}

	var response PaymentResponsibilityResponse
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return PaymentResponsibilityResponse{}, fmt.Errorf("decode response: %w", err)
	}

	if response.ID == uuid.Nil {
		return PaymentResponsibilityResponse{}, errors.New("invalid responsibility in response")
	}

	return response, nil
}
