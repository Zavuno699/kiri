package service

import "testing"

func TestPaymentRequestHashIsDeterministic(t *testing.T) {
	request := CreatePaymentRequest{
		Reference:      "KIRI-FP-0001",
		Amount:         20000,
		Currency:       "UGX",
		CustomerEmail:  "tenant@example.com",
		CustomerPhone:  "+256700000000",
		Network:        "MTN",
		CountryCode:    "UG",
		IdempotencyKey: "fingerprint-test-001",
		TraceID:        "trace-fingerprint-001",
	}

	first, err := PaymentRequestHash(request)
	if err != nil {
		t.Fatal(err)
	}

	second, err := PaymentRequestHash(request)
	if err != nil {
		t.Fatal(err)
	}

	if first != second {
		t.Fatalf("expected deterministic hash, got %q and %q", first, second)
	}

	if len(first) != 64 {
		t.Fatalf("expected SHA-256 hex length 64, got %d", len(first))
	}
}

func TestPaymentRequestHashChangesWhenRequestChanges(t *testing.T) {
	request := CreatePaymentRequest{
		Reference:      "KIRI-FP-0002",
		Amount:         20000,
		Currency:       "UGX",
		CustomerEmail:  "tenant@example.com",
		CustomerPhone:  "+256700000000",
		Network:        "MTN",
		CountryCode:    "UG",
		IdempotencyKey: "fingerprint-test-002",
		TraceID:        "trace-fingerprint-002",
	}

	original, err := PaymentRequestHash(request)
	if err != nil {
		t.Fatal(err)
	}

	request.Amount = 30000

	changed, err := PaymentRequestHash(request)
	if err != nil {
		t.Fatal(err)
	}

	if original == changed {
		t.Fatal("expected request hash to change when request changes")
	}
}
