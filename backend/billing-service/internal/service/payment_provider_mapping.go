package service

import (
	"github.com/google/uuid"

	"errors"
	"strings"
	"time"

	"github.com/kirilock/backend/billing-service/internal/model"
)

func BuildPendingPayment(
	tenantID string,
	request CreatePaymentRequest,
	provider string,
	providerPayment model.ProviderPayment,
) (model.Payment, error) {
	if strings.TrimSpace(tenantID) == "" {
		return model.Payment{}, errors.New("tenant ID is required")
	}

	tenantUUID, err := uuid.Parse(tenantID)
	if err != nil {
		return model.Payment{}, errors.New("tenant ID must be a valid UUID")
	}

	if strings.TrimSpace(provider) == "" {
		return model.Payment{}, errors.New("payment provider is required")
	}
	if strings.TrimSpace(request.TraceID) == "" {
		return model.Payment{}, errors.New("trace ID is required")
	}
	if strings.TrimSpace(providerPayment.ID) == "" {
		return model.Payment{}, errors.New("provider payment ID is required")
	}
	if providerPayment.Reference != request.Reference {
		return model.Payment{}, errors.New("provider reference mismatch")
	}
	if providerPayment.Amount != request.Amount {
		return model.Payment{}, errors.New("provider amount mismatch")
	}
	if strings.ToUpper(providerPayment.Currency) != strings.ToUpper(request.Currency) {
		return model.Payment{}, errors.New("provider currency mismatch")
	}

	now := time.Now().UTC()

	return model.Payment{
		ID:               uuid.New(),
		TenantID:         tenantUUID,
		Provider:         provider,
		ProviderChargeID: providerPayment.ID,
		Reference:        request.Reference,
		CorrelationID:    request.TraceID,
		AmountMinor:      request.Amount,
		Currency:         strings.ToUpper(request.Currency),
		Status:           model.PaymentPending,
		IdempotencyKey:   request.IdempotencyKey,
		CreatedAt:        now,
		UpdatedAt:        now,
		Version:          1,
	}, nil
}
