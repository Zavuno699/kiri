package contract

import (
	"testing"

	"github.com/google/uuid"
	"github.com/kirilock/backend/shared/validation"
)

func TestLeasePaymentPayloadValid(t *testing.T) {
	v := validation.New()

	payload := LeasePaymentPayload{
		TenantPhone:    "+256700000000",
		AmountUGX:      20000,
		DaysRequested:  30,
		IdempotencyKey: uuid.NewString(),
		CurrencyCode:   "UGX",
	}

	result := v.Struct(payload)

	if !result.Valid {
		t.Fatalf(
			"expected valid payload, got fields: %#v",
			result.Fields,
		)
	}

	if len(result.Fields) != 0 {
		t.Fatalf(
			"expected no validation errors, got %#v",
			result.Fields,
		)
	}
}

func TestLeasePaymentPayloadRejectsInvalidPhone(t *testing.T) {
	v := validation.New()

	payload := LeasePaymentPayload{
		TenantPhone:    "0700000000",
		AmountUGX:      20000,
		DaysRequested:  30,
		IdempotencyKey: uuid.NewString(),
		CurrencyCode:   "UGX",
	}

	result := v.Struct(payload)

	if result.Valid {
		t.Fatal("expected invalid phone to fail")
	}

	if _, ok := result.Fields["tenant_phone"]; !ok {
		t.Fatalf(
			"expected tenant_phone validation error, got %#v",
			result.Fields,
		)
	}
}

func TestLeasePaymentPayloadRejectsInvalidAmount(t *testing.T) {
	v := validation.New()

	payload := LeasePaymentPayload{
		TenantPhone:    "+256700000000",
		AmountUGX:      19999,
		DaysRequested:  30,
		IdempotencyKey: uuid.NewString(),
		CurrencyCode:   "UGX",
	}

	result := v.Struct(payload)

	if result.Valid {
		t.Fatal("expected invalid amount to fail")
	}

	if _, ok := result.Fields["amount_ugx"]; !ok {
		t.Fatalf(
			"expected amount_ugx validation error, got %#v",
			result.Fields,
		)
	}
}

func TestLeasePaymentPayloadRejectsInvalidCurrency(t *testing.T) {
	v := validation.New()

	payload := LeasePaymentPayload{
		TenantPhone:    "+256700000000",
		AmountUGX:      20000,
		DaysRequested:  30,
		IdempotencyKey: uuid.NewString(),
		CurrencyCode:   "EUR",
	}

	result := v.Struct(payload)

	if result.Valid {
		t.Fatal("expected invalid currency to fail")
	}

	if _, ok := result.Fields["currency_code"]; !ok {
		t.Fatalf(
			"expected currency_code validation error, got %#v",
			result.Fields,
		)
	}
}
