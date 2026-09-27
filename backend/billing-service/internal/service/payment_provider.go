package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/kirilock/backend/billing-service/internal/model"
)

type CreatePaymentRequest struct {
	PaymentResponsibilityID uuid.UUID `json:"payment_responsibility_id" validate:"required"`
	Reference               string
	Amount                  int64
	Currency                string
	CustomerEmail           string
	CustomerPhone           string
	Network                 string
	CountryCode             string
	IdempotencyKey          string
	TraceID                 string
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
