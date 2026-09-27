package service

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/billing-service/internal/identity"
	"github.com/kirilock/backend/billing-service/internal/model"
	"github.com/kirilock/backend/billing-service/internal/repository"
)

type PaymentApplication struct {
	provider       PaymentProvider
	repo           *repository.PaymentRepository
	identityClient identity.IdentityClient
}

func NewPaymentApplication(
	provider PaymentProvider,
	repo *repository.PaymentRepository,
	identityClient identity.IdentityClient,
) (*PaymentApplication, error) {
	if provider == nil {
		return nil, errors.New("payment provider is required")
	}
	if repo == nil {
		return nil, errors.New("payment repository is required")
	}
	if identityClient == nil {
		return nil, errors.New("identity client is required")
	}

	return &PaymentApplication{
		provider:       provider,
		repo:           repo,
		identityClient: identityClient,
	}, nil
}

func (s *PaymentApplication) CreatePendingPayment(
	ctx context.Context,
	sessionID string,
	request CreatePaymentRequest,
) (model.Payment, error) {
	if sessionID == "" {
		return model.Payment{}, errors.New("session ID is required")
	}

	if request.PaymentResponsibilityID == uuid.Nil {
		return model.Payment{}, errors.New("payment responsibility ID is required")
	}

	// Resolve responsibility from identity-service to derive ownership
	responsibility, err := s.identityClient.ResolvePaymentResponsibility(ctx, sessionID, request.PaymentResponsibilityID)
	if err != nil {
		// Preserve sentinel errors for handler mapping
		if errors.Is(err, identity.ErrResponsibilityNotFound) {
			return model.Payment{}, fmt.Errorf("payment responsibility not found: %w", identity.ErrResponsibilityNotFound)
		}
		if errors.Is(err, identity.ErrInvalidSession) {
			return model.Payment{}, fmt.Errorf("invalid session: %w", identity.ErrInvalidSession)
		}
		if errors.Is(err, identity.ErrForbidden) {
			return model.Payment{}, fmt.Errorf("forbidden: %w", identity.ErrForbidden)
		}
		if errors.Is(err, identity.ErrResponsibilityConflict) {
			return model.Payment{}, fmt.Errorf("payment responsibility conflict: %w", identity.ErrResponsibilityConflict)
		}
		return model.Payment{}, fmt.Errorf("resolve payment responsibility: %w", err)
	}

	// Validate responsibility is active
	if responsibility.Status != "ACTIVE" {
		return model.Payment{}, errors.New("payment responsibility is not active")
	}

	// Use tenant ID from responsibility directly (already a UUID)
	tenantUUID := responsibility.TenantSubjectID

	if tenantUUID == uuid.Nil {
		return model.Payment{}, errors.New("invalid tenant subject ID in responsibility")
	}

	// Include responsibility reference in idempotency hash
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
			return model.Payment{}, fmt.Errorf(
				"idempotency key was already used with a different request: %w",
				repository.ErrIdempotencyConflict,
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
		responsibility.TenantSubjectID,
		request,
		"FLUTTERWAVE",
		providerPayment,
	)
	if err != nil {
		return model.Payment{}, err
	}

	payment.TenantID = tenantUUID
	payment.PaymentResponsibilityID = &request.PaymentResponsibilityID

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
