package service

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
)

type paymentFingerprintPayload struct {
	Reference      string `json:"reference"`
	Amount         int64  `json:"amount"`
	Currency       string `json:"currency"`
	CustomerEmail  string `json:"customer_email"`
	CustomerPhone  string `json:"customer_phone"`
	Network        string `json:"network"`
	CountryCode    string `json:"country_code"`
	IdempotencyKey string `json:"idempotency_key"`
	TraceID        string `json:"trace_id"`
}

func PaymentRequestHash(request CreatePaymentRequest) (string, error) {
	payload := paymentFingerprintPayload{
		Reference:      request.Reference,
		Amount:         request.Amount,
		Currency:       request.Currency,
		CustomerEmail:  request.CustomerEmail,
		CustomerPhone:  request.CustomerPhone,
		Network:        request.Network,
		CountryCode:    request.CountryCode,
		IdempotencyKey: request.IdempotencyKey,
		TraceID:        request.TraceID,
	}

	data, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}

	sum := sha256.Sum256(data)
	return hex.EncodeToString(sum[:]), nil
}
