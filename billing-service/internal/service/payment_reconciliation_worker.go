package service

import (
	"context"
	"errors"
	"sync"
	"time"

	"github.com/kirilock/backend/billing-service/internal/repository"
)

type PaymentReconciliationWorker struct {
	reconciler *PaymentReconciler
	repo       *repository.PaymentRepository

	interval  time.Duration
	batchSize int

	startOnce sync.Once
	stopOnce  sync.Once

	stop      chan struct{}
	done      chan struct{}
	startedMu sync.RWMutex
	started   bool
}

func NewPaymentReconciliationWorker(
	reconciler *PaymentReconciler,
	repo *repository.PaymentRepository,
	interval time.Duration,
	batchSize int,
) (*PaymentReconciliationWorker, error) {
	if reconciler == nil {
		return nil, errors.New("payment reconciler is required")
	}

	if repo == nil {
		return nil, errors.New("payment repository is required")
	}

	if interval <= 0 {
		interval = 30 * time.Second
	}

	if batchSize <= 0 {
		batchSize = 50
	}

	if batchSize > 1000 {
		batchSize = 1000
	}

	return &PaymentReconciliationWorker{
		reconciler: reconciler,
		repo:       repo,
		interval:   interval,
		batchSize:  batchSize,
		stop:       make(chan struct{}),
		done:       make(chan struct{}),
	}, nil
}

func (w *PaymentReconciliationWorker) Start(ctx context.Context) {
	w.startOnce.Do(func() {
		w.startedMu.Lock()
		w.started = true
		w.startedMu.Unlock()

		go w.run(ctx)
	})
}

func (w *PaymentReconciliationWorker) Stop() {
	w.startedMu.RLock()
	started := w.started
	w.startedMu.RUnlock()

	if !started {
		return
	}

	w.stopOnce.Do(func() {
		close(w.stop)
	})

	<-w.done
}

func (w *PaymentReconciliationWorker) run(ctx context.Context) {
	defer close(w.done)

	ticker := time.NewTicker(w.interval)
	defer ticker.Stop()

	w.reconcileBatch(ctx)

	for {
		select {
		case <-ctx.Done():
			return

		case <-w.stop:
			return

		case <-ticker.C:
			w.reconcileBatch(ctx)
		}
	}
}

func (w *PaymentReconciliationWorker) reconcileBatch(ctx context.Context) {
	payments, err := w.repo.ListPendingPayments(ctx, w.batchSize)
	if err != nil {
		return
	}

	for _, payment := range payments {
		_, _ = w.reconciler.ReconcilePayment(
			ctx,
			payment.Reference,
		)
	}
}
