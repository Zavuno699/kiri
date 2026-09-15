package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	sharedhttp "github.com/kirilock/backend/shared/http"

	"github.com/kirilock/backend/identity-service/internal/handler"
	"github.com/kirilock/backend/identity-service/internal/repository"
	"github.com/kirilock/backend/identity-service/internal/service"
)

func main() {
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

	pool, err := pgxpool.New(ctx, databaseURL)
	if err != nil {
		log.Fatalf("failed to create database pool: %v", err)
	}
	defer pool.Close()

	subjectRepo, err := repository.NewDBSubjectRepository(pool)
	if err != nil {
		log.Fatalf("failed to create subject repository: %v", err)
	}

	credentialRepo, err := repository.NewDBCredentialRepository(pool)
	if err != nil {
		log.Fatalf("failed to create credential repository: %v", err)
	}

	sessionRepo, err := repository.NewDBSessionRepository(pool)
	if err != nil {
		log.Fatalf("failed to create session repository: %v", err)
	}

	subjectService, err := service.NewSubjectService(subjectRepo)
	if err != nil {
		log.Fatalf("failed to create subject service: %v", err)
	}

	sessionService, err := service.NewSessionService(sessionRepo, credentialRepo)
	if err != nil {
		log.Fatalf("failed to create session service: %v", err)
	}

	subjectHandler, err := handler.NewSubjectHandler(subjectService)
	if err != nil {
		log.Fatalf("failed to create subject handler: %v", err)
	}

	sessionHandler, err := handler.NewSessionHandler(sessionService)
	if err != nil {
		log.Fatalf("failed to create session handler: %v", err)
	}

	mux := http.NewServeMux()

	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("ok"))
	})

	mux.HandleFunc("POST /subjects", subjectHandler.CreateSubject)
	mux.HandleFunc("POST /authenticate", subjectHandler.Authenticate)

	mux.HandleFunc("POST /sessions", sessionHandler.CreateSession)
	mux.HandleFunc("POST /sessions/validate", sessionHandler.ValidateSession)
	mux.HandleFunc("POST /sessions/revoke", sessionHandler.RevokeSession)
	mux.HandleFunc("POST /sessions/revoke-all", sessionHandler.RevokeAllSubjectSessions)

	mux.HandleFunc("POST /subjects/admin", func(w http.ResponseWriter, r *http.Request) {
		principal := sharedhttp.Principal{TenantID: uuid.New()}
		ctx := sharedhttp.WithPrincipal(r.Context(), principal)
		subjectHandler.SetAdmin(w, r.WithContext(ctx))
	})

	mux.HandleFunc("POST /subjects/super-admin", func(w http.ResponseWriter, r *http.Request) {
		principal := sharedhttp.Principal{TenantID: uuid.New()}
		ctx := sharedhttp.WithPrincipal(r.Context(), principal)
		subjectHandler.SetSuperAdmin(w, r.WithContext(ctx))
	})

	server := &http.Server{
		Addr:         ":8081",
		Handler:      mux,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	go func() {
		log.Printf("identity-service starting on %s", server.Addr)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("server error: %v", err)
		}
	}()

	<-ctx.Done()

	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer shutdownCancel()

	log.Printf("identity-service shutting down...")
	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Fatalf("shutdown error: %v", err)
	}

	log.Printf("identity-service shutdown complete")
}
