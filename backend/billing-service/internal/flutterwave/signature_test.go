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
