package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"

	"github.com/kirilock/backend/billing-service"
	"github.com/kirilock/backend/billing-service/internal/repository"
	"github.com/kirilock/backend/shared/config"
	"github.com/kirilock/backend/shared/validation"
)

func main() {
	// Load .env only in development/test environment
	// Production relies on real environment variable injection
	config.LoadDevelopmentEnv()

	ctx, cancel := signal.NotifyContext(
		context.Background(),
		os.Interrupt,
		syscall.SIGTERM,
	)
	defer cancel()

	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("DATABASE_URL environment variable is required")
	}

	// Identity service URL for session validation
	identityServiceURL := os.Getenv("IDENTITY_SERVICE_URL")
	if identityServiceURL == "" {
		identityServiceURL = "http://localhost:8081"
	}

	// Billing service port
	port := os.Getenv("BILLING_SERVICE_PORT")
	if port == "" {
		port = "8082"
	}

	// Flutterwave configuration (optional for dev/test)
	flutterwaveConfig := billing.FlutterwaveConfig{
		BaseURL:      os.Getenv("FLUTTERWAVE_BASE_URL"),
		ClientID:     os.Getenv("FLUTTERWAVE_CLIENT_ID"),
		ClientSecret: os.Getenv("FLUTTERWAVE_CLIENT_SECRET"),
		Timeout:      30 * time.Second,
	}

	// Validator
	validator := validation.New()

	// Create billing service
	// Note: Flutterwave provider is optional - if credentials are missing,
	// we use a dev/test provider that simulates responses without external calls
	billingService, closeDatabase, err := billing.NewFromConfig(
		ctx,
		validator,
		databaseURL,
		flutterwaveConfig,
	)
	if err != nil {
		log.Fatalf("failed to create billing service: %v", err)
	}
	defer closeDatabase()

	// Start reconciliation runtime
	billingService.Start(ctx)
	defer billingService.Stop()

	// Create HTTP server with proper timeouts
	mux := http.NewServeMux()

	// Register health/readiness endpoints
	registerHealthEndpoints(mux, databaseURL)

	// Register billing routes
	billingService.RegisterRoutes(mux)

	// Register provider webhook route (if handler exists)
	// TODO: Wire webhook handler when it's implemented

	server := &http.Server{
		Addr:         ":" + port,
		Handler:      mux,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start server in goroutine
	go func() {
		log.Printf("billing-service listening on %s", server.Addr)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("server failed: %v", err)
		}
	}()

	// Wait for shutdown signal
	<-ctx.Done()

	// Graceful shutdown with timeout
	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer shutdownCancel()

	log.Println("shutting down billing-service...")
	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Printf("server shutdown error: %v", err)
	}
	log.Println("billing-service stopped")
}

func registerHealthEndpoints(mux *http.ServeMux, databaseURL string) {
	// /healthz - process liveness
	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("ok"))
	})

	// /readyz - dependency readiness (PostgreSQL)
	mux.HandleFunc("GET /readyz", func(w http.ResponseWriter, r *http.Request) {
		// Open a temporary connection to verify database availability
		db, err := repository.OpenDatabase(r.Context(), databaseURL)
		if err != nil {
			http.Error(w, "database unavailable", http.StatusServiceUnavailable)
			return
		}
		defer db.Close()

		if err := db.PingContext(r.Context()); err != nil {
			http.Error(w, "database unavailable", http.StatusServiceUnavailable)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Write([]byte("ready"))
	})
}
