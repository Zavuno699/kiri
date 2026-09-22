package service

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/kirilock/backend/billing-service/internal/model"
)

// DevTestProvider is a mock provider for development/testing
// It simulates payment responses without external provider calls
type DevTestProvider struct{}

var _ PaymentProvider = (*DevTestProvider)(nil)

// NewDevTestProvider creates a dev/test provider
func NewDevTestProvider() *DevTestProvider {
	return &DevTestProvider{}
}

func (p *DevTestProvider) CreatePayment(
	ctx context.Context,
	request CreatePaymentRequest,
) (model.ProviderPayment, error) {
	if request.Reference == "" {
		return model.ProviderPayment{}, errors.New("reference is required")
	}
	if request.Amount <= 0 {
		return model.ProviderPayment{}, errors.New("amount must be positive")
	}
	if request.Currency == "" {
		return model.ProviderPayment{}, errors.New("currency is required")
	}

	// Simulate a successful payment
	return model.ProviderPayment{
		ID:        uuid.New().String(),
		Reference: request.Reference,
		Amount:    request.Amount,
		Currency:  request.Currency,
		Status:    "successful",
	}, nil
}

func (p *DevTestProvider) VerifyPayment(
	ctx context.Context,
	transactionID string,
) (model.ProviderPayment, error) {
	if transactionID == "" {
		return model.ProviderPayment{}, errors.New("transaction ID is required")
	}

	// Simulate a successful payment verification
	return model.ProviderPayment{
		ID:       uuid.New().String(),
		Status:   "successful",
		Amount:   0, // Simulated payment without specific amount
		Currency: "UGX",
	}, nil
}
