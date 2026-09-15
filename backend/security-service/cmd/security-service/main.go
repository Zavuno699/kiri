package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

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

	credentialRegistry := security.NewCredentialRegistry()

	authenticator := security.NewTokenAuthenticator(
		tokenSecret,
		credentialRegistry,
	)

	mux := http.NewServeMux()

	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("ok"))
	})

	mux.HandleFunc("POST /authenticate", func(w http.ResponseWriter, r *http.Request) {
		principal, err := authenticator.Authenticate(r.Context(), r)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte(err.Error()))
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Write([]byte("authenticated: " + principal.Subject))
	})

	mux.Handle("GET /authorize", httpsecurity.Authenticate(authenticator, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		principal, err := security.RequirePrincipal(r.Context())
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte(err.Error()))
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Write([]byte("authorized: " + principal.Subject))
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
