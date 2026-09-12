#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> Fixing payment contract test type collision"

###############################################################################
# payment_contract.go is the canonical definition of LeasePaymentPayload.
# The test must consume that definition rather than redeclare it.
###############################################################################

cat > tests/contract/payment_contract_test.go <<'EOF'
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
EOF

echo "==> Formatting"
gofmt -w tests/contract/payment_contract_test.go

echo "==> Checking duplicate type declarations"
count="$(grep -Rhc '^type LeasePaymentPayload struct' tests/contract --include='*.go' | awk '{s+=$1} END {print s+0}')"

if [[ "$count" -ne 1 ]]; then
    echo "ERROR: expected exactly one LeasePaymentPayload definition; found $count"
    exit 1
fi

echo "    LeasePaymentPayload definitions: $count"

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
echo " KiriLock CONTRACT FOUNDATION PASSED"
echo "=============================================="
echo
echo "Verified:"
echo "  Canonical payment model       OK"
echo "  Payment validation tests      OK"
echo "  Validation foundation         OK"
echo "  HTTP foundation               OK"
echo "  Race detector                 OK"
echo "  go vet                        OK"
echo "  API build                     OK"
echo
ls -lh bin/kirilock-api
