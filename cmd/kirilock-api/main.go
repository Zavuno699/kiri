package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"syscall"
	"time"

	billing "github.com/kirilock/backend/billing-service"
	lease "github.com/kirilock/backend/lease-service"
	security "github.com/kirilock/backend/security-service"
	"github.com/kirilock/backend/shared/config"
	khttp "github.com/kirilock/backend/shared/http"
	"github.com/kirilock/backend/shared/validation"
)

const serviceName = "kirilock-api"

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("configuration error: %v", err)
	}

	readiness := khttp.NewStaticReadiness(true)

	// -------------------------------------------------------------------------
	// Database
	// -------------------------------------------------------------------------

	// -------------------------------------------------------------------------
	// Application composition.
	//
	// The API process knows about service boundaries.
	// Billing owns its repository/provider internals.
	// -------------------------------------------------------------------------

	databaseCfg, err := config.LoadDatabaseConfig()
	if err != nil {
		log.Fatalf("database configuration error: %v", err)
	}

	flutterwaveCfg, err := loadFlutterwaveConfig()
	if err != nil {
		log.Fatalf("flutterwave configuration error: %v", err)
	}

	validator := validation.New()

	securityService, err := security.New()
	if err != nil {
		log.Fatalf("security service initialization error: %v", err)
	}

	if err := security.Require(securityService); err != nil {
		log.Fatalf("security service readiness error: %v", err)
	}

	leaseService := lease.New()

	billingService, closeBilling, err := billing.NewFromConfig(
		context.Background(),
		validator,
		databaseCfg.URL,
		flutterwaveCfg,
	)
	if err != nil {
		log.Fatalf("billing service initialization error: %v", err)
	}
	defer func() {
		if err := closeBilling(); err != nil {
			log.Printf("billing database close failed: %v", err)
		}
	}()

	billingService.Start(context.Background())

	mux := http.NewServeMux()

	// Shared platform endpoints.
	mux.Handle(
		"GET /api/v1/health",
		khttp.HealthHandler(serviceName),
	)

	mux.Handle(
		"GET /api/v1/ready",
		khttp.ReadinessHandler(serviceName, readiness),
	)

	mux.HandleFunc(
		"GET /api/v1",
		func(w http.ResponseWriter, r *http.Request) {
			khttp.WriteJSON(w, http.StatusOK, map[string]any{
				"service": serviceName,
				"version": "v1",
			})
		},
	)

	// Billing-owned endpoints.
	billingService.RegisterRoutes(mux)
	leaseService.RegisterRoutes(mux)

	// Global HTTP middleware.
	var router http.Handler = mux

	router = khttp.Recover(router)
	router = khttp.SecurityHeaders(router)
	router = khttp.RequestMetadata(router)
	router = khttp.RequireJSON(router)

	server := &http.Server{
		Addr:              cfg.HTTP.Host + ":" + strconv.Itoa(cfg.HTTP.Port),
		Handler:           router,
		ReadHeaderTimeout: 5 * time.Second,
		IdleTimeout:       60 * time.Second,
		MaxHeaderBytes:    16 * 1024,
	}

	shutdownContext, stop := signal.NotifyContext(
		context.Background(),
		os.Interrupt,
		syscall.SIGTERM,
	)
	defer stop()

	go func() {
		log.Printf(
			"server listening address=%s environment=%s",
			server.Addr,
			cfg.App.Environment,
		)

		if err := server.ListenAndServe(); err != nil &&
			!errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("HTTP server error: %v", err)
		}
	}()

	<-shutdownContext.Done()

	log.Println("shutdown signal received")

	ctx, cancel := context.WithTimeout(
		context.Background(),
		15*time.Second,
	)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Printf("graceful shutdown failed: %v", err)
	}

	log.Println("server stopped")
}

func loadFlutterwaveConfig() (billing.FlutterwaveConfig, error) {
	baseURL := os.Getenv("FLUTTERWAVE_BASE_URL")
	clientID := os.Getenv("FLUTTERWAVE_CLIENT_ID")
	clientSecret := os.Getenv("FLUTTERWAVE_CLIENT_SECRET")

	if baseURL == "" {
		return billing.FlutterwaveConfig{}, errors.New("FLUTTERWAVE_BASE_URL is required")
	}
	if clientID == "" {
		return billing.FlutterwaveConfig{}, errors.New("FLUTTERWAVE_CLIENT_ID is required")
	}
	if clientSecret == "" {
		return billing.FlutterwaveConfig{}, errors.New("FLUTTERWAVE_CLIENT_SECRET is required")
	}

	timeout := 15 * time.Second

	if value := os.Getenv("FLUTTERWAVE_TIMEOUT_SECONDS"); value != "" {
		seconds, err := strconv.Atoi(value)
		if err != nil || seconds <= 0 {
			return billing.FlutterwaveConfig{}, errors.New(
				"FLUTTERWAVE_TIMEOUT_SECONDS must be a positive integer",
			)
		}
		timeout = time.Duration(seconds) * time.Second
	}

	return billing.FlutterwaveConfig{
		BaseURL:      baseURL,
		ClientID:     clientID,
		ClientSecret: clientSecret,
		Timeout:      timeout,
	}, nil
}
