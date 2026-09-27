package identity

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/google/uuid"
)

func TestResolvePaymentResponsibility_IdentityServiceContract(t *testing.T) {
	// This integration-style test verifies the exact contract with identity-service
	// /internal/payment-responsibilities endpoint
	// Identity-service expects the raw session ID in the Authorization header (no Bearer prefix)

	var receivedAuthHeader string
	var receivedSessionID string
	var receivedIDParam string

	responsibilityID := uuid.New()
	tenantSubjectID := uuid.New()
	paymentAccountID := uuid.New()
	tenancyID := uuid.New()

	// Fake identity-service server that mimics the real internal endpoint
	fakeIdentityService := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/internal/payment-responsibilities" {
			t.Errorf("expected path /internal/payment-responsibilities, got %s", r.URL.Path)
		}

		// Capture the Authorization header as received
		receivedAuthHeader = r.Header.Get("Authorization")
		receivedSessionID = receivedAuthHeader // identity-service uses the raw header value as session ID
		receivedIDParam = r.URL.Query().Get("id")

		// Simulate identity-service behavior
		if receivedSessionID == "valid-session-id" && receivedIDParam == responsibilityID.String() {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(PaymentResponsibilityResponse{
				ID:                      responsibilityID,
				TenantSubjectID:         tenantSubjectID,
				PaymentAccountID:        paymentAccountID,
				TenancyID:               tenancyID,
				Status:                  "ACTIVE",
				ResponsibleForRent:      true,
				ResponsibleForUtilities: false,
				ResponsibleForFees:      false,
				MonthlyRentAmountMinor:  500000,
				Notes:                   "Test responsibility",
				CreatedAt:               "2026-01-01T00:00:00Z",
				UpdatedAt:               "2026-01-01T00:00:00Z",
				PaymentAccountProvider:  "STRIPE",
				PaymentAccountStatus:    "ACTIVE",
			})
		} else if receivedSessionID == "invalid-session-id" {
			w.WriteHeader(http.StatusUnauthorized)
		} else if receivedSessionID == "forbidden-session-id" {
			w.WriteHeader(http.StatusForbidden)
		} else if receivedIDParam != responsibilityID.String() {
			w.WriteHeader(http.StatusNotFound)
		} else {
			w.WriteHeader(http.StatusInternalServerError)
		}
	}))
	defer fakeIdentityService.Close()

	client := NewClient(fakeIdentityService.URL)

	// Test 1: Valid request should succeed and decode all fields
	response, err := client.ResolvePaymentResponsibility(context.Background(), "valid-session-id", responsibilityID)
	if err != nil {
		t.Fatalf("expected success for valid request, got error: %v", err)
	}

	// Assert all response fields are decoded correctly
	if response.ID != responsibilityID {
		t.Errorf("expected ID %s, got %s", responsibilityID, response.ID)
	}
	if response.TenantSubjectID != tenantSubjectID {
		t.Errorf("expected TenantSubjectID %s, got %s", tenantSubjectID, response.TenantSubjectID)
	}
	if response.PaymentAccountID != paymentAccountID {
		t.Errorf("expected PaymentAccountID %s, got %s", paymentAccountID, response.PaymentAccountID)
	}
	if response.TenancyID != tenancyID {
		t.Errorf("expected TenancyID %s, got %s", tenancyID, response.TenancyID)
	}
	if response.Status != "ACTIVE" {
		t.Errorf("expected Status ACTIVE, got %s", response.Status)
	}
	if response.PaymentAccountProvider != "STRIPE" {
		t.Errorf("expected PaymentAccountProvider STRIPE, got %s", response.PaymentAccountProvider)
	}
	if response.PaymentAccountStatus != "ACTIVE" {
		t.Errorf("expected PaymentAccountStatus ACTIVE, got %s", response.PaymentAccountStatus)
	}

	// Verify the Authorization header was sent as raw session ID (no Bearer prefix)
	if receivedAuthHeader != "valid-session-id" {
		t.Errorf("expected Authorization header to be raw session ID 'valid-session-id', got '%s'", receivedAuthHeader)
	}

	// Verify the id query parameter equals the requested UUID
	if receivedIDParam != responsibilityID.String() {
		t.Errorf("expected id query param '%s', got '%s'", responsibilityID.String(), receivedIDParam)
	}

	// Test 2: 401 → ErrInvalidSession
	_, err = client.ResolvePaymentResponsibility(context.Background(), "invalid-session-id", responsibilityID)
	if err == nil {
		t.Fatal("expected error for invalid session")
	}
	if !errors.Is(err, ErrInvalidSession) {
		t.Errorf("expected ErrInvalidSession, got '%v'", err)
	}

	// Test 3: 403 → ErrForbidden
	_, err = client.ResolvePaymentResponsibility(context.Background(), "forbidden-session-id", responsibilityID)
	if err == nil {
		t.Fatal("expected error for forbidden session")
	}
	if !errors.Is(err, ErrForbidden) {
		t.Errorf("expected ErrForbidden, got '%v'", err)
	}

	// Test 4: 404 → ErrResponsibilityNotFound
	wrongID := uuid.New()
	_, err = client.ResolvePaymentResponsibility(context.Background(), "valid-session-id", wrongID)
	if err == nil {
		t.Fatal("expected error for not found")
	}
	if !errors.Is(err, ErrResponsibilityNotFound) {
		t.Errorf("expected ErrResponsibilityNotFound, got '%v'", err)
	}

	// Test 5: Empty responsibility ID should return error
	_, err = client.ResolvePaymentResponsibility(context.Background(), "valid-session-id", uuid.Nil)
	if err == nil {
		t.Fatal("expected error for nil responsibility ID")
	}
}

func TestResolvePaymentResponsibility_RawSessionNoBearer(t *testing.T) {
	// Negative control: prove that Bearer prefix would break the contract
	var receivedAuthHeader string

	fakeIdentityService := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		receivedAuthHeader = r.Header.Get("Authorization")

		// Identity-service treats the ENTIRE Authorization header as the session ID
		// If we send "Bearer valid-session-id", it will look for that exact string
		if receivedAuthHeader == "valid-session-id" {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(PaymentResponsibilityResponse{
				ID:              uuid.New(),
				TenantSubjectID: uuid.New(),
				Status:          "ACTIVE",
			})
		} else {
			// If we send "Bearer valid-session-id", this will fail
			w.WriteHeader(http.StatusUnauthorized)
		}
	}))
	defer fakeIdentityService.Close()

	client := NewClient(fakeIdentityService.URL)

	// With the correct implementation (no Bearer prefix), this should succeed
	_, err := client.ResolvePaymentResponsibility(context.Background(), "valid-session-id", uuid.New())
	if err != nil {
		t.Fatalf("expected success without Bearer prefix, got error: %v", err)
	}

	// Verify no Bearer prefix was added
	if receivedAuthHeader != "valid-session-id" {
		t.Errorf("test would fail if Bearer prefix is re-introduced: got '%s'", receivedAuthHeader)
	}
}

func TestResolvePaymentResponsibility_CorrectQueryKey(t *testing.T) {
	// Negative control: prove that wrong query key would break the contract
	var receivedQueryKey string

	responsibilityID := uuid.New()

	fakeIdentityService := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		receivedQueryKey = r.URL.Query().Get("id")

		if receivedQueryKey == responsibilityID.String() {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(PaymentResponsibilityResponse{
				ID:              responsibilityID,
				TenantSubjectID: uuid.New(),
				Status:          "ACTIVE",
			})
		} else {
			w.WriteHeader(http.StatusBadRequest)
		}
	}))
	defer fakeIdentityService.Close()

	client := NewClient(fakeIdentityService.URL)

	// With the correct implementation (using "id" key), this should succeed
	_, err := client.ResolvePaymentResponsibility(context.Background(), "valid-session-id", responsibilityID)
	if err != nil {
		t.Fatalf("expected success with correct query key, got error: %v", err)
	}

	// Verify the correct query key was used
	if receivedQueryKey != responsibilityID.String() {
		t.Errorf("test would fail if wrong query key is used: got '%s'", receivedQueryKey)
	}
}
