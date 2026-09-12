package billing

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/kirilock/backend/billing-service/internal/flutterwave"
	"github.com/kirilock/backend/billing-service/internal/handler"
	"github.com/kirilock/backend/billing-service/internal/repository"
	"github.com/kirilock/backend/billing-service/internal/service"
	"github.com/kirilock/backend/shared/validation"
)

type FlutterwaveConfig struct {
	BaseURL      string
	ClientID     string
	ClientSecret string
	Timeout      time.Duration
}

type Service struct {
	paymentHandler        *handler.PaymentApplicationHandler
	reconciliationHandler *handler.PaymentReconciliationHandler
	reconciliationRuntime *service.PaymentReconciliationRuntime
}

func New(
	validator *validation.Validator,
	provider service.PaymentProvider,
	repo *repository.PaymentRepository,
) (*Service, error) {
	if validator == nil {
		return nil, errors.New("validator is required")
	}
	if provider == nil {
		return nil, errors.New("payment provider is required")
	}
	if repo == nil {
		return nil, errors.New("payment repository is required")
	}

	application, err := service.NewPaymentApplication(provider, repo)
	if err != nil {
		return nil, fmt.Errorf(
			"create payment application: %w",
			err,
		)
	}

	reconciler, err := service.NewPaymentReconciler(
		provider,
		repo,
	)
	if err != nil {
		return nil, fmt.Errorf(
			"create payment reconciler: %w",
			err,
		)
	}

	reconciliationApplication, err :=
		service.NewPaymentReconciliationApplication(
			reconciler,
		)
	if err != nil {
		return nil, fmt.Errorf(
			"create payment reconciliation application: %w",
			err,
		)
	}

	reconciliationHandler, err :=
		handler.NewPaymentReconciliationHandler(
			reconciliationApplication,
		)
	if err != nil {
		return nil, fmt.Errorf(
			"create payment reconciliation handler: %w",
			err,
		)
	}

	runtimeConfig :=
		service.DefaultPaymentReconciliationRuntimeConfig().Normalize()

	worker, err := service.NewConfiguredPaymentReconciliationWorker(
		reconciler,
		repo,
		service.PaymentReconciliationWorkerConfig{
			Interval:  runtimeConfig.Interval,
			BatchSize: runtimeConfig.BatchSize,
		},
	)
	if err != nil {
		return nil, fmt.Errorf(
			"create payment reconciliation worker: %w",
			err,
		)
	}

	reconciliationRuntime, err :=
		service.NewPaymentReconciliationRuntime(worker)
	if err != nil {
		return nil, fmt.Errorf(
			"create payment reconciliation runtime: %w",
			err,
		)
	}

	paymentHandler, err := handler.NewPaymentApplicationHandler(
		validator,
		application,
	)
	if err != nil {
		return nil, err
	}

	return &Service{
		paymentHandler:        paymentHandler,
		reconciliationHandler: reconciliationHandler,
		reconciliationRuntime: reconciliationRuntime,
	}, nil
}

func NewFromConfig(
	ctx context.Context,
	validator *validation.Validator,
	databaseURL string,
	flutterwaveConfig FlutterwaveConfig,
) (*Service, func() error, error) {
	if ctx == nil {
		return nil, nil, errors.New("context is required")
	}
	if validator == nil {
		return nil, nil, errors.New("validator is required")
	}
	if databaseURL == "" {
		return nil, nil, errors.New("database URL is required")
	}

	db, err := repository.OpenDatabase(ctx, databaseURL)
	if err != nil {
		return nil, nil, err
	}

	provider, err := NewFlutterwaveProvider(flutterwaveConfig)
	if err != nil {
		_ = db.Close()
		return nil, nil, err
	}

	repo := repository.NewPaymentRepository(db)

	billingService, err := New(
		validator,
		provider,
		repo,
	)
	if err != nil {
		_ = db.Close()
		return nil, nil, err
	}

	closeDatabase := func() error {
		billingService.Stop()
		return db.Close()
	}

	return billingService, closeDatabase, nil
}

func NewFlutterwaveProvider(cfg FlutterwaveConfig) (
	service.PaymentProvider,
	error,
) {
	client, err := flutterwave.NewClient(flutterwave.Config{
		BaseURL:      cfg.BaseURL,
		ClientID:     cfg.ClientID,
		ClientSecret: cfg.ClientSecret,
		Timeout:      cfg.Timeout,
	})
	if err != nil {
		return nil, err
	}

	return flutterwave.NewProvider(client)
}

func (s *Service) Start(ctx context.Context) {
	if s == nil || s.reconciliationRuntime == nil {
		return
	}

	s.reconciliationRuntime.Start(ctx)
}

func (s *Service) Stop() {
	if s == nil || s.reconciliationRuntime == nil {
		return
	}

	s.reconciliationRuntime.Stop()
}

func (s *Service) RegisterRoutes(mux *http.ServeMux) {
	s.paymentHandler.RegisterRoutes(mux)

	if s.reconciliationHandler == nil {
		panic("payment reconciliation handler is required")
	}

	mux.Handle(
		"POST /api/v1/payments/reconcile",
		http.HandlerFunc(s.reconciliationHandler.Reconcile),
	)
}
