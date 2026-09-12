package service

import (
	"context"
	"errors"
)

type PaymentReconciliationRuntime struct {
	worker *PaymentReconciliationWorker
}

func NewPaymentReconciliationRuntime(
	worker *PaymentReconciliationWorker,
) (*PaymentReconciliationRuntime, error) {
	if worker == nil {
		return nil, errors.New("payment reconciliation worker is required")
	}

	return &PaymentReconciliationRuntime{
		worker: worker,
	}, nil
}

func (r *PaymentReconciliationRuntime) Start(ctx context.Context) {
	r.worker.Start(ctx)
}

func (r *PaymentReconciliationRuntime) Stop() {
	r.worker.Stop()
}
