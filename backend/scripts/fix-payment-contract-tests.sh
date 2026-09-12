#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> Aligning payment contract tests with KiriLock validation API"

cat > tests/contract/payment_contract_test.go <<'EOF'
package contract

import (
	"testing"

	"github.com/google/uuid"
	"github.com/kirilock/backend/shared/validation"
)

type LeasePaymentPayload struct {
	TenantPhone    string `json:"tenant_phone" validate:"required,e164"`
	AmountUGX      int64  `json:"amount_ugx" validate:"required,gte=20000"`
	DaysRequested  int    `json:"days_requested" validate:"required,gte=1,lte=365"`
	IdempotencyKey string `json:"idempotency_key" validate:"required,uuid4"`
	CurrencyCode   string `json:"currency_code" validate:"required,oneof=UGX USD"`
}

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
EOF

echo "==> Formatting"
gofmt -w tests/contract/payment_contract_test.go

echo "==> Running all tests"
go test ./...

echo "==> Running race detector"
go test -race ./...

echo "==> Running vet"
go vet ./...

echo "==> Building API server"
mkdir -p bin
go build -o bin/kirilock-api ./cmd/kirilock-api

echo
echo "=============================================="
echo " KiriLock VALIDATION FOUNDATION PASSED"
echo "=============================================="
echo
echo "Verified:"
echo "  Existing validation contract  OK"
echo "  Payment contract validation   OK"
echo "  Field-level errors            OK"
echo "  Email normalization            OK"
echo "  Phone normalization            OK"
echo "  Strict HTTP validation         OK"
echo "  Race detector                  OK"
echo "  go vet                         OK"
echo "  API build                      OK"
echo
echo "Binary:"
ls -lh bin/kirilock-api
