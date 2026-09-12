package service

import (
	"context"
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/billing-service/internal/model"
	"github.com/kirilock/backend/billing-service/internal/repository"
)

type PaymentApplication struct {
	provider PaymentProvider
	repo     *repository.PaymentRepository
}

func NewPaymentApplication(
	provider PaymentProvider,
	repo *repository.PaymentRepository,
) (*PaymentApplication, error) {
	if provider == nil {
		return nil, errors.New("payment provider is required")
	}
	if repo == nil {
		return nil, errors.New("payment repository is required")
	}

	return &PaymentApplication{
		provider: provider,
		repo:     repo,
	}, nil
}

func (s *PaymentApplication) CreatePendingPayment(
	ctx context.Context,
	tenantID uuid.UUID,
	request CreatePaymentRequest,
) (model.Payment, error) {
	if tenantID == uuid.Nil {
		return model.Payment{}, errors.New("tenant ID is required")
	}

	requestHash, err := PaymentRequestHash(request)
	if err != nil {
		return model.Payment{}, err
	}

	existingPayment, err := s.repo.GetByIdempotencyKey(
		ctx,
		"FLUTTERWAVE",
		request.IdempotencyKey,
	)
	if err == nil {
		if existingPayment.RequestHash != requestHash {
			return model.Payment{}, errors.New(
				"idempotency key was already used with a different request",
			)
		}
		return existingPayment, nil
	}

	if !errors.Is(err, repository.ErrPaymentNotFound) {
		return model.Payment{}, err
	}

	now := time.Now().UTC()

	claim, err := s.repo.ClaimPaymentIdempotency(
		ctx,
		"FLUTTERWAVE",
		request.IdempotencyKey,
		requestHash,
		request.Reference,
		now,
	)
	if err != nil {
		return model.Payment{}, err
	}

	if claim.Status == "COMPLETED" && claim.PaymentID != nil {
		payment, err := s.repo.GetByReference(ctx, request.Reference)
		if err != nil {
			return model.Payment{}, err
		}
		return payment, nil
	}

	providerPayment, err := s.provider.CreatePayment(
		ctx,
		request,
	)
	if err != nil {
		return model.Payment{}, err
	}

	payment, err := BuildPendingPayment(
		tenantID.String(),
		request,
		"FLUTTERWAVE",
		providerPayment,
	)
	if err != nil {
		return model.Payment{}, err
	}

	payment.TenantID = tenantID

	if strings.TrimSpace(providerPayment.ID) == "" {
		return model.Payment{}, errors.New(
			"provider payment ID is required",
		)
	}

	payment.ProviderChargeID = providerPayment.ID
	payment.RequestHash = requestHash

	if err := payment.Validate(); err != nil {
		return model.Payment{}, err
	}

	if err := s.repo.CreatePending(ctx, payment); err != nil {
		return model.Payment{}, err
	}

	if err := s.repo.CompletePaymentIdempotency(
		ctx,
		"FLUTTERWAVE",
		request.IdempotencyKey,
		payment.ID,
		now,
	); err != nil {
		return model.Payment{}, err
	}

	return payment, nil
}
