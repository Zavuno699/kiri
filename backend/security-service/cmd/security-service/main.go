package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/kirilock/backend/security-service/internal/api/dto/request"
	"github.com/kirilock/backend/security-service/internal/api/dto/response"
	"github.com/kirilock/backend/security-service/internal/repository"
	security "github.com/kirilock/backend/security-service/internal/security"
	sharedhttp "github.com/kirilock/backend/shared/http"
	sharedvalidation "github.com/kirilock/backend/shared/validation"
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
		nil,
	)

	validator := sharedvalidation.New()

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

		if r.Header.Get("Content-Type") != "application/json" {
			http.Error(w, "unsupported media type", http.StatusUnsupportedMediaType)
			return
		}

		r.Body = http.MaxBytesReader(w, r.Body, 1<<20)

		var req request.Authenticate
		if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
			sharedhttp.WriteValidationError(w, r, err)
			return
		}

		if err := validator.Error(req); err != nil {
			sharedhttp.WriteValidationError(w, r, err)
			return
		}

		principal, err := authenticator.Authenticate(r.Context(), r)
		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte(`{"error":"unauthorized"}`))
			return
		}

		authResp := response.Authentication{
			Authenticated: true,
			Subject:       principal.Subject,
			Roles:         principal.Roles,
			Permissions:   principal.Permissions,
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(authResp)
	})

	mux.HandleFunc("POST /authorize", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		if r.Header.Get("Content-Type") != "application/json" {
			http.Error(w, "unsupported media type", http.StatusUnsupportedMediaType)
			return
		}

		r.Body = http.MaxBytesReader(w, r.Body, 1<<20)

		principal, err := authenticator.Authenticate(r.Context(), r)
		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte(`{"error":"unauthorized"}`))
			return
		}

		var req request.Authorize
		if err := sharedhttp.DecodeJSON(w, r, &req); err != nil {
			sharedhttp.WriteValidationError(w, r, err)
			return
		}

		if err := validator.Error(req); err != nil {
			sharedhttp.WriteValidationError(w, r, err)
			return
		}

		scope := security.Scope(req.Resource + ":" + req.Action)
		policy := security.NewDefaultAuthorizationPolicy()

		roles := make([]security.Role, len(principal.Roles))
		for i, r := range principal.Roles {
			roles[i] = security.Role(r)
		}

		if !policy.Allows(roles, scope) {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusForbidden)
			w.Write([]byte(`{"error":"forbidden"}`))
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"subject":"` + principal.Subject + `","authorized":true}`))
	})

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
