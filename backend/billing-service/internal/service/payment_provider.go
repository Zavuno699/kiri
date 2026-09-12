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
