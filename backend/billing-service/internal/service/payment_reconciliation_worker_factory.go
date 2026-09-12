package service

import (
	"time"

	"github.com/kirilock/backend/billing-service/internal/repository"
)

type PaymentReconciliationWorkerConfig struct {
	Interval  time.Duration
	BatchSize int
}

func NewConfiguredPaymentReconciliationWorker(
	reconciler *PaymentReconciler,
	repo *repository.PaymentRepository,
	cfg PaymentReconciliationWorkerConfig,
) (*PaymentReconciliationWorker, error) {
	return NewPaymentReconciliationWorker(
		reconciler,
		repo,
		cfg.Interval,
		cfg.BatchSize,
	)
}
