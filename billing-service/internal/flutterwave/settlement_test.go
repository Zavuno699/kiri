package flutterwave

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"testing"
)

type phase5GPayment struct {
	ID               string
	ProviderChargeID string
	Reference        string
	Amount           int64
	Currency         string
	Status           string
	Settled          bool
}

type phase5GWebhook struct {
	Event string `json:"event"`

	Data struct {
		ID        string `json:"id"`
		Reference string `json:"reference"`
		Amount    int64  `json:"amount"`
		Currency  string `json:"currency"`
		Status    string `json:"status"`
	} `json:"data"`
}

func phase5GSign(secret string, payload []byte) string {
	mac := hmac.New(sha256.New, []byte(secret))
	_, _ = mac.Write(payload)

	return base64.StdEncoding.EncodeToString(mac.Sum(nil))
}

func phase5GParseAndValidateWebhook(
	payload []byte,
	signature string,
	secret string,
	payment phase5GPayment,
) error {
	if !VerifySignature(payload, signature, secret) {
		return ErrInvalidWebhookSignature
	}

	var webhook phase5GWebhook

	if err := json.Unmarshal(payload, &webhook); err != nil {
		return ErrMalformedWebhook
	}

	if webhook.Data.ID == "" {
		return ErrMalformedWebhook
	}

	if webhook.Data.Reference == "" {
		return ErrMalformedWebhook
	}

	if webhook.Data.Reference != payment.Reference {
		return ErrSettlementMismatch
	}

	if webhook.Data.ID != payment.ProviderChargeID {
		return ErrSettlementMismatch
	}

	if webhook.Data.Amount != payment.Amount {
		return ErrSettlementMismatch
	}

	if webhook.Data.Currency != payment.Currency {
		return ErrSettlementMismatch
	}

	if webhook.Data.Status != "successful" {
		return ErrPaymentNotSuccessful
	}

	return nil
}

func TestPhase5GAcceptsValidSettlement(t *testing.T) {
	secret := "phase5g-secret"

	payment := phase5GPayment{
		ID:               "pay_001",
		ProviderChargeID: "chg_001",
		Reference:        "KIRI-5G-001",
		Amount:           20000,
		Currency:         "UGX",
		Status:           "pending",
	}

	payload := []byte(`{
		"event":"charge.completed",
		"data":{
			"id":"chg_001",
			"reference":"KIRI-5G-001",
			"amount":20000,
			"currency":"UGX",
			"status":"successful"
		}
	}`)

	signature := phase5GSign(secret, payload)

	err := phase5GParseAndValidateWebhook(
		payload,
		signature,
		secret,
		payment,
	)

	if err != nil {
		t.Fatalf("valid settlement rejected: %v", err)
	}
}

func TestPhase5GRejectsWrongReference(t *testing.T) {
	secret := "phase5g-secret"

	payment := phase5GPayment{
		ID:               "pay_002",
		ProviderChargeID: "chg_002",
		Reference:        "KIRI-5G-002",
		Amount:           20000,
		Currency:         "UGX",
		Status:           "pending",
	}

	payload := []byte(`{
		"event":"charge.completed",
		"data":{
			"id":"chg_002",
			"reference":"ATTACKER-REFERENCE",
			"amount":20000,
			"currency":"UGX",
			"status":"successful"
		}
	}`)

	signature := phase5GSign(secret, payload)

	err := phase5GParseAndValidateWebhook(
		payload,
		signature,
		secret,
		payment,
	)

	if err != ErrSettlementMismatch {
		t.Fatalf(
			"error = %v, want ErrSettlementMismatch",
			err,
		)
	}
}

func TestPhase5GRejectsWrongProviderChargeID(t *testing.T) {
	secret := "phase5g-secret"

	payment := phase5GPayment{
		ID:               "pay_003",
		ProviderChargeID: "chg_real_003",
		Reference:        "KIRI-5G-003",
		Amount:           20000,
		Currency:         "UGX",
		Status:           "pending",
	}

	payload := []byte(`{
		"event":"charge.completed",
		"data":{
			"id":"chg_fake_003",
			"reference":"KIRI-5G-003",
			"amount":20000,
			"currency":"UGX",
			"status":"successful"
		}
	}`)

	signature := phase5GSign(secret, payload)

	err := phase5GParseAndValidateWebhook(
		payload,
		signature,
		secret,
		payment,
	)

	if err != ErrSettlementMismatch {
		t.Fatalf(
			"error = %v, want ErrSettlementMismatch",
			err,
		)
	}
}

func TestPhase5GRejectsWrongAmount(t *testing.T) {
	secret := "phase5g-secret"

	payment := phase5GPayment{
		ID:               "pay_004",
		ProviderChargeID: "chg_004",
		Reference:        "KIRI-5G-004",
		Amount:           20000,
		Currency:         "UGX",
		Status:           "pending",
	}

	payload := []byte(`{
		"event":"charge.completed",
		"data":{
			"id":"chg_004",
			"reference":"KIRI-5G-004",
			"amount":999999,
			"currency":"UGX",
			"status":"successful"
		}
	}`)

	signature := phase5GSign(secret, payload)

	err := phase5GParseAndValidateWebhook(
		payload,
		signature,
		secret,
		payment,
	)

	if err != ErrSettlementMismatch {
		t.Fatalf(
			"error = %v, want ErrSettlementMismatch",
			err,
		)
	}
}

func TestPhase5GRejectsWrongCurrency(t *testing.T) {
	secret := "phase5g-secret"

	payment := phase5GPayment{
		ID:               "pay_005",
		ProviderChargeID: "chg_005",
		Reference:        "KIRI-5G-005",
		Amount:           20000,
		Currency:         "UGX",
		Status:           "pending",
	}

	payload := []byte(`{
		"event":"charge.completed",
		"data":{
			"id":"chg_005",
			"reference":"KIRI-5G-005",
			"amount":20000,
			"currency":"USD",
			"status":"successful"
		}
	}`)

	signature := phase5GSign(secret, payload)

	err := phase5GParseAndValidateWebhook(
		payload,
		signature,
		secret,
		payment,
	)

	if err != ErrSettlementMismatch {
		t.Fatalf(
			"error = %v, want ErrSettlementMismatch",
			err,
		)
	}
}

func TestPhase5GRejectsPendingPayment(t *testing.T) {
	secret := "phase5g-secret"

	payment := phase5GPayment{
		ID:               "pay_006",
		ProviderChargeID: "chg_006",
		Reference:        "KIRI-5G-006",
		Amount:           20000,
		Currency:         "UGX",
		Status:           "pending",
	}

	payload := []byte(`{
		"event":"charge.completed",
		"data":{
			"id":"chg_006",
			"reference":"KIRI-5G-006",
			"amount":20000,
			"currency":"UGX",
			"status":"pending"
		}
	}`)

	signature := phase5GSign(secret, payload)

	err := phase5GParseAndValidateWebhook(
		payload,
		signature,
		secret,
		payment,
	)

	if err != ErrPaymentNotSuccessful {
		t.Fatalf(
			"error = %v, want ErrPaymentNotSuccessful",
			err,
		)
	}
}

func TestPhase5GRejectsTamperedWebhook(t *testing.T) {
	secret := "phase5g-secret"

	payment := phase5GPayment{
		ID:               "pay_007",
		ProviderChargeID: "chg_007",
		Reference:        "KIRI-5G-007",
		Amount:           20000,
		Currency:         "UGX",
		Status:           "pending",
	}

	original := []byte(`{
		"event":"charge.completed",
		"data":{
			"id":"chg_007",
			"reference":"KIRI-5G-007",
			"amount":20000,
			"currency":"UGX",
			"status":"successful"
		}
	}`)

	signature := phase5GSign(secret, original)

	tampered := []byte(`{
		"event":"charge.completed",
		"data":{
			"id":"chg_007",
			"reference":"KIRI-5G-007",
			"amount":999999,
			"currency":"UGX",
			"status":"successful"
		}
	}`)

	err := phase5GParseAndValidateWebhook(
		tampered,
		signature,
		secret,
		payment,
	)

	if err != ErrInvalidWebhookSignature {
		t.Fatalf(
			"error = %v, want ErrInvalidWebhookSignature",
			err,
		)
	}
}

func TestPhase5GDoesNotMutatePaymentDuringValidation(t *testing.T) {
	secret := "phase5g-secret"

	payment := phase5GPayment{
		ID:               "pay_008",
		ProviderChargeID: "chg_008",
		Reference:        "KIRI-5G-008",
		Amount:           20000,
		Currency:         "UGX",
		Status:           "pending",
		Settled:          false,
	}

	payload := []byte(`{
		"event":"charge.completed",
		"data":{
			"id":"chg_008",
			"reference":"KIRI-5G-008",
			"amount":20000,
			"currency":"UGX",
			"status":"successful"
		}
	}`)

	signature := phase5GSign(secret, payload)

	err := phase5GParseAndValidateWebhook(
		payload,
		signature,
		secret,
		payment,
	)

	if err != nil {
		t.Fatalf("unexpected validation error: %v", err)
	}

	if payment.Settled {
		t.Fatal(
			"webhook validation must not itself mutate settlement state",
		)
	}

	if payment.Status != "pending" {
		t.Fatalf(
			"payment status changed during validation: %q",
			payment.Status,
		)
	}
}
