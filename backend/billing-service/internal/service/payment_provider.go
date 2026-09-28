package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/kirilock/backend/billing-service/internal/model"
)

type CreatePaymentRequest struct {
	PaymentResponsibilityID uuid.UUID `json:"payment_responsibility_id" validate:"required"`
	Reference               string    `json:"reference"`
	Amount                  int64     `json:"amount"`
	Currency                string    `json:"currency"`
	CustomerEmail           string    `json:"customer_email"`
	CustomerPhone           string    `json:"customer_phone"`
	Network                 string    `json:"network"`
	CountryCode             string    `json:"country_code"`
	IdempotencyKey          string    `json:"idempotency_key"`
	TraceID                 string    `json:"trace_id"`
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
