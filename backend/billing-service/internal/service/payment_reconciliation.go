package service

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/kirilock/backend/billing-service/internal/model"
	"github.com/kirilock/backend/billing-service/internal/repository"
)

var (
	ErrPaymentReconciliationPending = errors.New("payment reconciliation remains pending")
	ErrPaymentReconciliationFailed  = errors.New("payment reconciliation failed")
)

type PaymentReconciler struct {
	provider PaymentProvider
	repo     *repository.PaymentRepository
}

func NewPaymentReconciler(
	provider PaymentProvider,
	repo *repository.PaymentRepository,
) (*PaymentReconciler, error) {
	if provider == nil {
		return nil, errors.New("payment provider is required")
	}
	if repo == nil {
		return nil, errors.New("payment repository is required")
	}

	return &PaymentReconciler{
		provider: provider,
		repo:     repo,
	}, nil
}

func (r *PaymentReconciler) ReconcilePayment(
	ctx context.Context,
	reference string,
) (model.Payment, error) {
	reference = strings.TrimSpace(reference)
	if reference == "" {
		return model.Payment{}, errors.New("payment reference is required")
	}

	payment, err := r.repo.GetByReference(ctx, reference)
	if err != nil {
		return model.Payment{}, err
	}

	switch payment.Status {
	case model.PaymentSettled,
		model.PaymentFailed,
		model.PaymentCancelled:
		return payment, nil
	}

	transactionID := strings.TrimSpace(payment.ProviderChargeID)
	if transactionID == "" {
		return payment, fmt.Errorf(
			"provider charge id is required for reconciliation",
		)
	}

	providerPayment, err := r.provider.VerifyPayment(ctx, transactionID)
	if err != nil {
		return payment, fmt.Errorf(
			"verify provider payment: %w",
			err,
		)
	}

	if strings.TrimSpace(providerPayment.Reference) != "" &&
		!strings.EqualFold(
			strings.TrimSpace(providerPayment.Reference),
			strings.TrimSpace(payment.Reference),
		) {
		return payment, fmt.Errorf(
			"provider reference mismatch during reconciliation",
		)
	}

	if providerPayment.Amount != 0 &&
		providerPayment.Amount != payment.AmountUGX {
		return payment, fmt.Errorf(
			"provider amount mismatch during reconciliation",
		)
	}

	if providerPayment.Currency != "" &&
		!strings.EqualFold(
			providerPayment.Currency,
			payment.Currency,
		) {
		return payment, fmt.Errorf(
			"provider currency mismatch during reconciliation",
		)
	}

	status := strings.ToUpper(
		strings.TrimSpace(providerPayment.Status),
	)
	now := time.Now().UTC()

	switch status {
	case "SUCCESS",
		"SUCCESSFUL",
		"COMPLETED",
		"SETTLED":

		settled, err := r.repo.SettlePaymentFromReconciliation(
			ctx,
			payment.Provider,
			payment.Reference,
			providerPayment.ID,
			payment.AmountUGX,
			payment.Currency,
			now,
		)
		if err != nil {
			return payment, err
		}

		return settled, nil

	case "FAILED",
		"CANCELLED":

		failed, err := r.repo.FailPayment(
			ctx,
			payment.Reference,
			providerPayment.ID,
			now,
		)
		if err != nil {
			return model.Payment{}, err
		}

		if err := r.repo.FailPaymentIdempotency(
			ctx,
			payment.Provider,
			payment.IdempotencyKey,
			now,
		); err != nil {
			return model.Payment{}, err
		}

		return failed, ErrPaymentReconciliationFailed

	case "PENDING",
		"PROCESSING",
		"QUEUED",
		"":
		return payment, ErrPaymentReconciliationPending

	default:
		return payment, fmt.Errorf(
			"unknown provider payment status %q",
			providerPayment.Status,
		)
	}
}
