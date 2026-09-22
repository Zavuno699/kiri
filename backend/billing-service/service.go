package billing

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/kirilock/backend/billing-service/internal/flutterwave"
	"github.com/kirilock/backend/billing-service/internal/handler"
	"github.com/kirilock/backend/billing-service/internal/identity"
	"github.com/kirilock/backend/billing-service/internal/middleware"
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
	identityClient        *identity.Client
	authMiddleware        *middleware.AuthenticationMiddleware
}

func New(
	validator *validation.Validator,
	provider service.PaymentProvider,
	repo *repository.PaymentRepository,
	identityClient *identity.Client,
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
	if identityClient == nil {
		return nil, errors.New("identity client is required")
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

	authMiddleware := middleware.NewAuthenticationMiddleware(identityClient)

	return &Service{
		paymentHandler:        paymentHandler,
		reconciliationHandler: reconciliationHandler,
		reconciliationRuntime: reconciliationRuntime,
		identityClient:        identityClient,
		authMiddleware:        authMiddleware,
	}, nil
}

func NewFromConfig(
	ctx context.Context,
	validator *validation.Validator,
	databaseURL string,
	flutterwaveConfig FlutterwaveConfig,
	identityServiceURL string,
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
	if identityServiceURL == "" {
		return nil, nil, errors.New("identity service URL is required")
	}

	db, err := repository.OpenDatabase(ctx, databaseURL)
	if err != nil {
		return nil, nil, err
	}

	// Identity client for session validation
	identityClient := identity.NewClient(identityServiceURL)

	// Provider selection: DevTestProvider only in dev/test, Flutterwave otherwise
	var provider service.PaymentProvider
	env := os.Getenv("KIRI_ENV")
	isDevOrTest := env == "development" || env == "test"

	if flutterwaveConfig.BaseURL != "" && flutterwaveConfig.ClientID != "" && flutterwaveConfig.ClientSecret != "" {
		// Use real Flutterwave provider if credentials are provided
		provider, err = NewFlutterwaveProvider(flutterwaveConfig)
		if err != nil {
			_ = db.Close()
			return nil, nil, err
		}
	} else if isDevOrTest {
		// Use dev/test provider in dev/test environment
		provider = service.NewDevTestProvider()
	} else {
		// In production, Flutterwave credentials are required
		_ = db.Close()
		return nil, nil, errors.New("Flutterwave credentials are required in production environment")
	}

	repo := repository.NewPaymentRepository(db)

	billingService, err := New(
		validator,
		provider,
		repo,
		identityClient,
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
	// Wrap all /api/v1/* routes with authentication middleware
	apiMux := http.NewServeMux()
	s.paymentHandler.RegisterRoutes(apiMux)

	// Register reconciliation handler if present
	if s.reconciliationHandler != nil {
		apiMux.Handle(
			"POST /api/v1/payments/reconcile",
			http.HandlerFunc(s.reconciliationHandler.Reconcile),
		)
	}

	// Apply authentication middleware to all /api/v1/* routes
	mux.Handle("/api/v1/", s.authMiddleware.Authenticate(apiMux))
}
