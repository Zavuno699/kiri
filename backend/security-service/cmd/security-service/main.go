package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/kirilock/backend/security-service/internal/repository"
	security "github.com/kirilock/backend/security-service/internal/security"
	httpsecurity "github.com/kirilock/backend/security-service/internal/security/http"
)

func main() {
	ctx, cancel := signal.NotifyContext(
		context.Background(),
		os.Interrupt,
		syscall.SIGTERM,
	)
	defer cancel()

	tokenSecret := os.Getenv("SECURITY_TOKEN_SECRET")
	if tokenSecret == "" {
		log.Fatal("SECURITY_TOKEN_SECRET environment variable is required")
	}

	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("DATABASE_URL environment variable is required")
	}

	pool, err := pgxpool.New(ctx, databaseURL)
	if err != nil {
		log.Fatalf("failed to create database pool: %v", err)
	}
	defer pool.Close()

	credentialRepo, err := repository.NewDBCredentialRepository(pool)
	if err != nil {
		log.Fatalf("failed to create credential repository: %v", err)
	}

	revocationRepo, err := repository.NewDBRevocationRepository(pool)
	if err != nil {
		log.Fatalf("failed to create revocation repository: %v", err)
	}

	subjectRepo, err := repository.NewDBSubjectRepository(pool)
	if err != nil {
		log.Fatalf("failed to create subject repository: %v", err)
	}

	authenticator := security.NewTokenAuthenticator(
		tokenSecret,
		credentialRepo,
		revocationRepo,
		subjectRepo,
	)

	mux := http.NewServeMux()

	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("ok"))
	})

	mux.HandleFunc("POST /authenticate", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		r.Body = http.MaxBytesReader(w, r.Body, 1<<20)

		principal, err := authenticator.Authenticate(r.Context(), r)
		if err != nil {
			w.Header().Set("Content-Type", "text/plain")
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("unauthorized"))
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"subject":"` + principal.Subject + `","authenticated":true}`))
	})

	mux.Handle("GET /authorize", httpsecurity.Authenticate(authenticator, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		principal, err := security.RequirePrincipal(r.Context())
		if err != nil {
			w.Header().Set("Content-Type", "text/plain")
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("unauthorized"))
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"subject":"` + principal.Subject + `","authorized":true}`))
	})))

	server := &http.Server{
		Addr:         ":8080",
		Handler:      mux,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	go func() {
		log.Printf("security-service starting on %s", server.Addr)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("server error: %v", err)
		}
	}()

	<-ctx.Done()

	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer shutdownCancel()

	log.Printf("security-service shutting down...")
	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Fatalf("shutdown error: %v", err)
	}

	log.Printf("security-service shutdown complete")
}
