package flutterwave

import (
	"context"
	"testing"

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
	provider := testProvider(t)

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
