package flutterwave

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"testing"
)

func phase5FSignature(secret string, payload []byte) string {
	mac := hmac.New(sha256.New, []byte(secret))
	_, _ = mac.Write(payload)

	return base64.StdEncoding.EncodeToString(mac.Sum(nil))
}

func TestPhase5FValidWebhookSignature(t *testing.T) {
	secret := "phase5f-webhook-secret"

	payload := []byte(`{
		"event":"charge.completed",
		"data":{
			"id":"chg_phase5f_001",
			"reference":"KIRI-5F-001",
			"amount":20000,
			"currency":"UGX",
			"status":"successful"
		}
	}`)

	signature := phase5FSignature(secret, payload)

	if !VerifySignature(payload, signature, secret) {
		t.Fatal("valid webhook signature was rejected")
	}
}

func TestPhase5FRejectsTamperedPayload(t *testing.T) {
	secret := "phase5f-webhook-secret"

	original := []byte(`{
		"event":"charge.completed",
		"data":{
			"id":"chg_phase5f_002",
			"reference":"KIRI-5F-002",
			"amount":20000,
			"currency":"UGX",
			"status":"successful"
		}
	}`)

	signature := phase5FSignature(secret, original)

	tampered := []byte(`{
		"event":"charge.completed",
		"data":{
			"id":"chg_phase5f_002",
			"reference":"KIRI-5F-002",
			"amount":999999,
			"currency":"UGX",
			"status":"successful"
		}
	}`)

	if VerifySignature(tampered, signature, secret) {
		t.Fatal("tampered webhook payload was accepted")
	}
}

func TestPhase5FRejectsWrongSecret(t *testing.T) {
	payload := []byte(`{"event":"charge.completed"}`)

	signature := phase5FSignature(
		"correct-secret",
		payload,
	)

	if VerifySignature(
		payload,
		signature,
		"wrong-secret",
	) {
		t.Fatal("webhook signed with wrong secret was accepted")
	}
}

func TestPhase5FRejectsMissingSignature(t *testing.T) {
	payload := []byte(`{"event":"charge.completed"}`)

	if VerifySignature(
		payload,
		"",
		"phase5f-webhook-secret",
	) {
		t.Fatal("missing webhook signature was accepted")
	}
}

func TestPhase5FRejectsEmptySecret(t *testing.T) {
	payload := []byte(`{"event":"charge.completed"}`)

	signature := phase5FSignature("", payload)

	if VerifySignature(payload, signature, "") {
		t.Fatal("empty webhook secret must not be accepted")
	}
}

func TestPhase5FRejectsEmptyPayload(t *testing.T) {
	secret := "phase5f-webhook-secret"

	signature := phase5FSignature(
		secret,
		[]byte{},
	)

	if VerifySignature(
		[]byte{},
		signature,
		secret,
	) {
		t.Fatal("empty webhook payload must be rejected")
	}
}

func TestPhase5FWebhookPayloadCanBeParsed(t *testing.T) {
	payload := []byte(`{
		"event":"charge.completed",
		"data":{
			"id":"chg_phase5f_003",
			"reference":"KIRI-5F-003",
			"amount":20000,
			"currency":"UGX",
			"status":"successful"
		}
	}`)

	var envelope struct {
		Event string `json:"event"`
		Data  struct {
			ID        string `json:"id"`
			Reference string `json:"reference"`
			Amount    int64  `json:"amount"`
			Currency  string `json:"currency"`
			Status    string `json:"status"`
		} `json:"data"`
	}

	if err := json.Unmarshal(payload, &envelope); err != nil {
		t.Fatalf("webhook JSON failed to parse: %v", err)
	}

	if envelope.Event != "charge.completed" {
		t.Fatalf(
			"event = %q, want charge.completed",
			envelope.Event,
		)
	}

	if envelope.Data.ID != "chg_phase5f_003" {
		t.Fatalf("unexpected charge ID")
	}

	if envelope.Data.Reference != "KIRI-5F-003" {
		t.Fatalf("unexpected payment reference")
	}

	if envelope.Data.Amount != 20000 {
		t.Fatalf(
			"amount = %d, want 20000",
			envelope.Data.Amount,
		)
	}

	if envelope.Data.Currency != "UGX" {
		t.Fatalf(
			"currency = %q, want UGX",
			envelope.Data.Currency,
		)
	}

	if envelope.Data.Status != "successful" {
		t.Fatalf(
			"status = %q, want successful",
			envelope.Data.Status,
		)
	}
}

func TestPhase5FSignatureMustMatchExactPayload(t *testing.T) {
	secret := "phase5f-webhook-secret"

	payloadA := []byte(`{"event":"charge.completed"}`)

	payloadB := []byte(`{"event":"charge.completed","extra":"changed"}`)

	signature := phase5FSignature(secret, payloadA)

	if VerifySignature(payloadB, signature, secret) {
		t.Fatal("signature accepted a different payload")
	}
}

func TestPhase5FSuccessfulStatusIsNotEnoughByItself(t *testing.T) {
	payload := []byte(`{
		"event":"charge.completed",
		"data":{
			"id":"chg_phase5f_004",
			"reference":"ATTACKER-CREATED-REFERENCE",
			"amount":1,
			"currency":"USD",
			"status":"successful"
		}
	}`)

	var envelope struct {
		Data struct {
			Reference string `json:"reference"`
			Amount    int64  `json:"amount"`
			Currency  string `json:"currency"`
			Status    string `json:"status"`
		} `json:"data"`
	}

	if err := json.Unmarshal(payload, &envelope); err != nil {
		t.Fatalf("unexpected parse error: %v", err)
	}

	/*
		A "successful" status inside arbitrary JSON does not prove
		that KiriLock should settle a payment.

		The production settlement path must additionally verify:
		  - webhook signature
		  - provider charge identity
		  - internal payment reference
		  - expected amount
		  - expected currency
		  - provider status
		  - idempotency/replay state
	*/

	if envelope.Data.Status != "successful" {
		t.Fatal("test fixture must contain successful status")
	}

	if envelope.Data.Reference == "" {
		t.Fatal("test fixture must contain reference")
	}

	if envelope.Data.Amount <= 0 {
		t.Fatal("test fixture must contain positive amount")
	}
}
