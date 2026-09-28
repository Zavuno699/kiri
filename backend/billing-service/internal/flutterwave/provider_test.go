package flutterwave

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/kirilock/backend/billing-service/internal/service"
)

func testProvider(t *testing.T) *Provider {
	t.Helper()

	client := &Client{}
	provider, err := NewProvider(client)
	if err != nil {
		t.Fatalf("NewProvider() error = %v", err)
	}

	return provider
}

func TestNewProviderRejectsNilClient(t *testing.T) {
	_, err := NewProvider(nil)
	if err == nil {
		t.Fatal("expected error for nil client")
	}
}

func TestCreatePaymentRejectsMissingReference(t *testing.T) {
	provider := testProvider(t)

	_, err := provider.CreatePayment(
		context.Background(),
		service.CreatePaymentRequest{
			Amount:         20000,
			Currency:       "UGX",
			CustomerEmail:  "tenant@example.com",
			CustomerPhone:  "+256700000001",
			Network:        "MTN",
			CountryCode:    "UG",
			IdempotencyKey: "KIRI-TEST-IDEMPOTENCY-001",
			TraceID:        "KIRI-TRACE-001",
		},
	)

	if err == nil {
		t.Fatal("expected validation error")
	}
}

func TestCreatePaymentRejectsInvalidAmount(t *testing.T) {
	provider := testProvider(t)

	_, err := provider.CreatePayment(
		context.Background(),
		service.CreatePaymentRequest{
			Reference:      "KIRI-001",
			Amount:         0,
			Currency:       "UGX",
			CustomerEmail:  "tenant@example.com",
			CustomerPhone:  "+256700000001",
			Network:        "MTN",
			CountryCode:    "UG",
			IdempotencyKey: "KIRI-TEST-IDEMPOTENCY-002",
			TraceID:        "KIRI-TRACE-002",
		},
	)

	if err == nil {
		t.Fatal("expected validation error")
	}
}

func TestCreatePaymentRejectsMissingCurrency(t *testing.T) {
	provider := testProvider(t)

	_, err := provider.CreatePayment(
		context.Background(),
		service.CreatePaymentRequest{
			Reference:      "KIRI-001",
			Amount:         20000,
			CustomerEmail:  "tenant@example.com",
			CustomerPhone:  "+256700000001",
			Network:        "MTN",
			CountryCode:    "UG",
			IdempotencyKey: "KIRI-TEST-IDEMPOTENCY-003",
			TraceID:        "KIRI-TRACE-003",
		},
	)

	if err == nil {
		t.Fatal("expected validation error")
	}
}

func TestCreatePaymentRejectsMissingCustomerEmail(t *testing.T) {
	provider := testProvider(t)

	_, err := provider.CreatePayment(
		context.Background(),
		service.CreatePaymentRequest{
			Reference:      "KIRI-001",
			Amount:         20000,
			Currency:       "UGX",
			CustomerPhone:  "+256700000001",
			Network:        "MTN",
			CountryCode:    "UG",
			IdempotencyKey: "KIRI-TEST-IDEMPOTENCY-004",
			TraceID:        "KIRI-TRACE-004",
		},
	)

	if err == nil {
		t.Fatal("expected validation error")
	}
}

func TestCreatePaymentRejectsMissingCustomerPhone(t *testing.T) {
	provider := testProvider(t)

	_, err := provider.CreatePayment(
		context.Background(),
		service.CreatePaymentRequest{
			Reference:      "KIRI-001",
			Amount:         20000,
			Currency:       "UGX",
			CustomerEmail:  "tenant@example.com",
			Network:        "MTN",
			CountryCode:    "UG",
			IdempotencyKey: "KIRI-TEST-IDEMPOTENCY-005",
			TraceID:        "KIRI-TRACE-005",
		},
	)

	if err == nil {
		t.Fatal("expected validation error")
	}
}

func TestCreatePaymentRejectsMissingNetwork(t *testing.T) {
	provider := testProvider(t)

	_, err := provider.CreatePayment(
		context.Background(),
		service.CreatePaymentRequest{
			Reference:      "KIRI-001",
			Amount:         20000,
			Currency:       "UGX",
			CustomerEmail:  "tenant@example.com",
			CustomerPhone:  "+256700000001",
			CountryCode:    "UG",
			IdempotencyKey: "KIRI-TEST-IDEMPOTENCY-006",
			TraceID:        "KIRI-TRACE-006",
		},
	)

	if err == nil {
		t.Fatal("expected validation error")
	}
}

func TestCreatePaymentRejectsMissingCountryCode(t *testing.T) {
	provider := testProvider(t)

	_, err := provider.CreatePayment(
		context.Background(),
		service.CreatePaymentRequest{
			Reference:      "KIRI-001",
			Amount:         20000,
			Currency:       "UGX",
			CustomerEmail:  "tenant@example.com",
			CustomerPhone:  "+256700000001",
			Network:        "MTN",
			IdempotencyKey: "KIRI-TEST-IDEMPOTENCY-007",
			TraceID:        "KIRI-TRACE-007",
		},
	)

	if err == nil {
		t.Fatal("expected validation error")
	}
}

func TestCreatePaymentRejectsMissingIdempotencyKey(t *testing.T) {
	provider := testProvider(t)

	_, err := provider.CreatePayment(
		context.Background(),
		service.CreatePaymentRequest{
			Reference:     "KIRI-001",
			Amount:        20000,
			Currency:      "UGX",
			CustomerEmail: "tenant@example.com",
			CustomerPhone: "+256700000001",
			Network:       "MTN",
			CountryCode:   "UG",
			TraceID:       "KIRI-TRACE-008",
		},
	)

	if err == nil {
		t.Fatal("expected validation error")
	}
}

func TestVerifyPaymentRejectsEmptyReference(t *testing.T) {
	provider := testProvider(t)

	_, err := provider.VerifyPayment(
		context.Background(),
		"",
	)

	if err == nil {
		t.Fatal("expected validation error")
	}
}

func TestVerifyPaymentNeverManufacturesSuccessfulPayment(t *testing.T) {
	// Create a mock server that returns a non-successful verification response
	mockServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Mock token endpoint
		if r.URL.Path == "/token" {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			_ = json.NewEncoder(w).Encode(map[string]any{
				"access_token": "test-token",
				"token_type":   "Bearer",
				"expires_in":   3600,
			})
			return
		}

		// Mock verification endpoint - return pending status (not successful)
		if strings.HasPrefix(r.URL.Path, "/charges/") {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			_ = json.NewEncoder(w).Encode(map[string]any{
				"status":  "success",
				"message": "Charge fetched",
				"data": map[string]any{
					"id":        "FLW-VERIFY-001",
					"reference": "KIRI-VERIFY-001",
					"amount":    20000,
					"currency":  "UGX",
					"status":    "pending", // Explicitly non-successful
				},
			})
			return
		}

		http.NotFound(w, r)
	}))
	defer mockServer.Close()

	// Create a client with the mock server
	client, err := NewClient(Config{
		BaseURL:      mockServer.URL,
		ClientID:     "test-client-id",
		ClientSecret: "test-client-secret",
		Timeout:      15 * time.Second,
	})
	if err != nil {
		t.Fatalf("NewClient() error = %v", err)
	}

	// Override tokenURL to point to mock server for testing
	client.tokenURL = mockServer.URL + "/token"

	provider, err := NewProvider(client)
	if err != nil {
		t.Fatalf("NewProvider() error = %v", err)
	}

	payment, err := provider.VerifyPayment(
		context.Background(),
		"KIRI-VERIFY-001",
	)

	if err != nil {
		t.Fatalf("VerifyPayment() error = %v", err)
	}

	if payment.Reference != "KIRI-VERIFY-001" {
		t.Fatalf(
			"reference = %q, want %q",
			payment.Reference,
			"KIRI-VERIFY-001",
		)
	}

	if payment.Status == "successful" {
		t.Fatal("verification boundary must not manufacture successful payment")
	}

	if payment.Status != "pending" {
		t.Fatalf(
			"status = %q, want pending",
			payment.Status,
		)
	}
}
