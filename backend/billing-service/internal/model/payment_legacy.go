package model

import "time"

// PaymentRequest is the request accepted by the existing billing service.
//
// Validation is intentionally declared at the request boundary. The handler
// performs structural JSON validation first and then applies these field-level
// constraints before the request reaches the payment service.
type PaymentRequest struct {
	TenantPhone    string `json:"tenant_phone" validate:"required,e164"`
	AmountUGX      int64  `json:"amount_ugx" validate:"required,gte=20000"`
	DaysRequested  int    `json:"days_requested" validate:"required,gte=1,lte=365"`
	IdempotencyKey string `json:"idempotency_key" validate:"required,uuid4"`
	CurrencyCode   string `json:"currency_code" validate:"required,oneof=UGX USD"`
}

// PaymentStatusAccepted is the existing API/service-level status used when
// a payment request has been accepted for processing.
//
// Accepted is deliberately distinct from PaymentSettled:
// accepted != financially settled.
const PaymentStatusAccepted PaymentStatus = "ACCEPTED"

// PaymentResult is the result returned by the existing billing service.
//
// This is an API/service-level acceptance result. It must not be interpreted
// as proof that funds have settled with Flutterwave.
type PaymentResult struct {
	PaymentID      string        `json:"payment_id"`
	Reference      string        `json:"reference"`
	TenantPhone    string        `json:"tenant_phone"`
	AmountUGX      int64         `json:"amount_ugx"`
	DaysRequested  int           `json:"days_requested"`
	DaysGranted    int           `json:"days_granted"`
	CurrencyCode   string        `json:"currency_code"`
	Currency       string        `json:"currency"`
	Status         PaymentStatus `json:"status"`
	IdempotencyKey string        `json:"idempotency_key"`
	CreatedAt      time.Time     `json:"created_at"`
}
