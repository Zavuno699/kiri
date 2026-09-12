package service

import (
	"context"
	"errors"
	"strings"

	"github.com/kirilock/backend/billing-service/internal/model"
)

type PaymentReconciliationApplication struct {
	reconciler *PaymentReconciler
}

func NewPaymentReconciliationApplication(
	reconciler *PaymentReconciler,
) (*PaymentReconciliationApplication, error) {
	if reconciler == nil {
		return nil, errors.New("payment reconciler is required")
	}

	return &PaymentReconciliationApplication{
		reconciler: reconciler,
	}, nil
}

func (a *PaymentReconciliationApplication) Reconcile(
	ctx context.Context,
	reference string,
) (model.Payment, error) {
	reference = strings.TrimSpace(reference)
	if reference == "" {
		return model.Payment{}, errors.New("payment reference is required")
	}

	return a.reconciler.ReconcilePayment(ctx, reference)
}
