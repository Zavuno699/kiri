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

	"github.com/kirilock/backend/identity-service/internal/client"
	"github.com/kirilock/backend/identity-service/internal/handler"
	"github.com/kirilock/backend/identity-service/internal/middleware"
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

	securityServiceURL := os.Getenv("SECURITY_SERVICE_URL")
	if securityServiceURL == "" {
		securityServiceURL = "http://localhost:8080"
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

	authClient := client.NewAuthClient(securityServiceURL)
	authMiddleware := middleware.NewAuthMiddleware(authClient)

	mux := http.NewServeMux()

	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("ok"))
	})

	mux.HandleFunc("POST /subjects", subjectHandler.CreateSubject)
	mux.HandleFunc("POST /authenticate", subjectHandler.Authenticate)

	mux.Handle("POST /sessions", authMiddleware.Authenticate(http.HandlerFunc(sessionHandler.CreateSession)))
	mux.Handle("POST /sessions/validate", authMiddleware.Authenticate(http.HandlerFunc(sessionHandler.ValidateSession)))
	mux.Handle("POST /sessions/revoke", authMiddleware.Authenticate(http.HandlerFunc(sessionHandler.RevokeSession)))
	mux.Handle("POST /sessions/revoke-all", authMiddleware.Authenticate(http.HandlerFunc(sessionHandler.RevokeAllSubjectSessions)))

	mux.Handle("POST /subjects/admin", authMiddleware.Authenticate(http.HandlerFunc(subjectHandler.SetAdmin)))
	mux.Handle("POST /subjects/super-admin", authMiddleware.Authenticate(http.HandlerFunc(subjectHandler.SetSuperAdmin)))

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
