package identity

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"

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

	req.Header.Set("Authorization", "Bearer "+sessionID)

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
