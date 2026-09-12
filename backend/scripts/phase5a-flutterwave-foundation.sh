#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo
echo "============================================================"
echo " KiriLock Phase 5A — Flutterwave Foundation"
echo "============================================================"
echo

echo "[1/7] Creating directories..."
mkdir -p billing-service/internal/flutterwave

echo "[2/7] Creating provider model..."

cat > billing-service/internal/model/provider_payment.go <<'EOF'
package model

// ProviderPayment is the provider-neutral representation of a payment.
//
// Flutterwave-specific response fields must not leak into the billing domain.
type ProviderPayment struct {
	ID        string
	Reference string
	Amount    int64
	Currency  string
	Status    string
}
EOF

echo "[3/7] Creating PaymentProvider interface..."

cat > billing-service/internal/service/payment_provider.go <<'EOF'
package service

import (
	"context"

	"github.com/kirilock/backend/billing-service/internal/model"
)

type CreatePaymentRequest struct {
	Reference      string
	Amount         int64
	Currency       string
	CustomerEmail  string
	CustomerPhone  string
	Network        string
	CountryCode    string
	IdempotencyKey string
	TraceID        string
}

// PaymentProvider is the provider-neutral billing boundary.
type PaymentProvider interface {
	CreatePayment(
		ctx context.Context,
		request CreatePaymentRequest,
	) (model.ProviderPayment, error)

	VerifyPayment(
		ctx context.Context,
		transactionID string,
	) (model.ProviderPayment, error)
}
EOF

echo "[4/7] Creating Flutterwave signature verifier..."

cat > billing-service/internal/flutterwave/signature.go <<'EOF'
package flutterwave

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
)

// VerifySignature verifies an HMAC-SHA256 webhook signature.
//
// The raw webhook body must be used. Do not marshal a decoded JSON object
// back into JSON before verification.
func VerifySignature(
	rawBody []byte,
	signature string,
	secret string,
) bool {
	if len(rawBody) == 0 || signature == "" || secret == "" {
		return false
	}

	mac := hmac.New(sha256.New, []byte(secret))

	if _, err := mac.Write(rawBody); err != nil {
		return false
	}

	expected := base64.StdEncoding.EncodeToString(mac.Sum(nil))

	return hmac.Equal(
		[]byte(expected),
		[]byte(signature),
	)
}
EOF

echo "[5/7] Creating signature tests..."

cat > billing-service/internal/flutterwave/signature_test.go <<'EOF'
package flutterwave

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"testing"
)

func makeSignature(body []byte, secret string) string {
	mac := hmac.New(sha256.New, []byte(secret))
	_, _ = mac.Write(body)

	return base64.StdEncoding.EncodeToString(mac.Sum(nil))
}

func TestVerifySignature(t *testing.T) {
	body := []byte(`{"id":"test-001","status":"successful"}`)
	secret := "test-secret"

	signature := makeSignature(body, secret)

	if !VerifySignature(body, signature, secret) {
		t.Fatal("expected signature to be valid")
	}
}

func TestVerifySignatureRejectsTamperedBody(t *testing.T) {
	body := []byte(`{"id":"test-001","status":"successful"}`)
	secret := "test-secret"

	signature := makeSignature(body, secret)

	tamperedBody := []byte(`{"id":"test-001","status":"failed"}`)

	if VerifySignature(tamperedBody, signature, secret) {
		t.Fatal("expected tampered body to be rejected")
	}
}

func TestVerifySignatureRejectsWrongSecret(t *testing.T) {
	body := []byte(`{"id":"test-001","status":"successful"}`)

	signature := makeSignature(body, "correct-secret")

	if VerifySignature(body, signature, "wrong-secret") {
		t.Fatal("expected wrong secret to be rejected")
	}
}

func TestVerifySignatureRejectsMissingValues(t *testing.T) {
	body := []byte(`{"id":"test-001"}`)

	tests := []struct {
		name      string
		signature string
		secret    string
	}{
		{"missing signature", "", "secret"},
		{"missing secret", "signature", ""},
		{"both missing", "", ""},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if VerifySignature(body, tt.signature, tt.secret) {
				t.Fatal("expected verification to fail")
			}
		})
	}
}
EOF

echo "[6/7] Formatting..."
gofmt -w \
	billing-service/internal/model/provider_payment.go \
	billing-service/internal/service/payment_provider.go \
	billing-service/internal/flutterwave/signature.go \
	billing-service/internal/flutterwave/signature_test.go

echo "[7/7] Verifying..."

echo
echo "--- go test ./... ---"
go test ./...

echo
echo "--- go test -race ./... ---"
go test -race ./...

echo
echo "--- go vet ./... ---"
go vet ./...

echo
echo "============================================================"
echo " KiriLock PHASE 5A PASSED"
echo "============================================================"
echo
echo "Created:"
echo "  billing-service/internal/flutterwave/"
echo "  billing-service/internal/model/provider_payment.go"
echo "  billing-service/internal/service/payment_provider.go"
echo
echo "Verified:"
echo "  Provider abstraction       OK"
echo "  HMAC signature validation  OK"
echo "  Tamper rejection           OK"
echo "  Wrong-secret rejection     OK"
echo "  Race detector              OK"
echo "  go vet                     OK"
echo
echo "NO REAL FLUTTERWAVE REQUESTS WERE MADE."
echo
