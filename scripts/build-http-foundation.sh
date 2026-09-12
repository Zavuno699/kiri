#!/usr/bin/env bash

set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "=============================================="
echo " KiriLock HTTP/API Foundation"
echo "=============================================="

# ------------------------------------------------------------
# Directories
# ------------------------------------------------------------

mkdir -p \
    shared/http \
    cmd/kirilock-api \
    tests/integration

# ------------------------------------------------------------
# HTTP response helpers
# ------------------------------------------------------------

cat > shared/http/response.go <<'EOF'
package http

import (
	"encoding/json"
	nethttp "net/http"
)

type ErrorResponse struct {
	Error APIErrorResponse `json:"error"`
}

type APIErrorResponse struct {
	Code      string              `json:"code"`
	Message   string              `json:"message"`
	RequestID string              `json:"request_id,omitempty"`
	Fields    map[string][]string `json:"fields,omitempty"`
}

func WriteJSON(
	w nethttp.ResponseWriter,
	status int,
	value any,
) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)

	// The response has already been selected as JSON. If encoding
	// unexpectedly fails, the connection cannot safely be rewritten
	// after headers have been sent.
	_ = json.NewEncoder(w).Encode(value)
}

func WriteError(
	w nethttp.ResponseWriter,
	status int,
	code string,
	message string,
	requestID string,
	fields map[string][]string,
) {
	WriteJSON(w, status, ErrorResponse{
		Error: APIErrorResponse{
			Code:      code,
			Message:   message,
			RequestID: requestID,
			Fields:    fields,
		},
	})
}
EOF

# ------------------------------------------------------------
# Request metadata middleware
# ------------------------------------------------------------

cat > shared/http/middleware.go <<'EOF'
package http

import (
	"context"
	"net/http"

	"github.com/google/uuid"
)

const (
	HeaderRequestID     = "X-Request-ID"
	HeaderCorrelationID = "X-Correlation-ID"
)

func RequestMetadata(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestID := sanitizeIDHeader(r.Header.Get(HeaderRequestID))
		correlationID := sanitizeIDHeader(r.Header.Get(HeaderCorrelationID))

		if requestID == "" {
			requestID = uuid.NewString()
		}

		if correlationID == "" {
			correlationID = requestID
		}

		ctx := context.WithValue(
			r.Context(),
			requestIDKey,
			requestID,
		)

		ctx = context.WithValue(
			ctx,
			correlationIDKey,
			correlationID,
		)

		w.Header().Set(HeaderRequestID, requestID)
		w.Header().Set(HeaderCorrelationID, correlationID)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func sanitizeIDHeader(value string) string {
	if len(value) > 128 {
		return ""
	}

	for _, r := range value {
		switch {
		case r >= 'a' && r <= 'z':
		case r >= 'A' && r <= 'Z':
		case r >= '0' && r <= '9':
		case r == '-', r == '_', r == '.', r == ':':
		default:
			return ""
		}
	}

	return value
}
EOF

# ------------------------------------------------------------
# HTTP method middleware
# ------------------------------------------------------------

cat > shared/http/method.go <<'EOF'
package http

import "net/http"

func RequireMethod(method string, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != method {
			w.Header().Set("Allow", method)

			WriteError(
				w,
				http.StatusMethodNotAllowed,
				"METHOD_NOT_ALLOWED",
				"HTTP method is not allowed for this endpoint",
				RequestID(r.Context()),
				nil,
			)

			return
		}

		next.ServeHTTP(w, r)
	})
}
EOF

# ------------------------------------------------------------
# Content-Type middleware
# ------------------------------------------------------------

cat > shared/http/content_type.go <<'EOF'
package http

import (
	"net/http"
	"strings"
)

func RequireJSON(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		contentType := r.Header.Get("Content-Type")

		if r.Method == http.MethodGet ||
			r.Method == http.MethodHead ||
			r.Method == http.MethodOptions {
			next.ServeHTTP(w, r)
			return
		}

		mediaType := strings.TrimSpace(
			strings.Split(contentType, ";")[0],
		)

		if mediaType != "application/json" {
			WriteError(
				w,
				http.StatusUnsupportedMediaType,
				"UNSUPPORTED_MEDIA_TYPE",
				"Content-Type must be application/json",
				RequestID(r.Context()),
				nil,
			)

			return
		}

		next.ServeHTTP(w, r)
	})
}
EOF

# ------------------------------------------------------------
# Security headers
# ------------------------------------------------------------

cat > shared/http/security.go <<'EOF'
package http

import "net/http"

func SecurityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("X-Frame-Options", "DENY")
		w.Header().Set("Referrer-Policy", "no-referrer")
		w.Header().Set(
			"Content-Security-Policy",
			"default-src 'none'; frame-ancestors 'none'",
		)

		next.ServeHTTP(w, r)
	})
}
EOF

# ------------------------------------------------------------
# Panic recovery
# ------------------------------------------------------------

cat > shared/http/recovery.go <<'EOF'
package http

import (
	"log"
	"net/http"
)

func Recover(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if recovered := recover(); recovered != nil {
				log.Printf(
					"panic recovered request_id=%s value=%v",
					RequestID(r.Context()),
					recovered,
				)

				WriteError(
					w,
					http.StatusInternalServerError,
					"INTERNAL_ERROR",
					"An internal server error occurred",
					RequestID(r.Context()),
					nil,
				)
			}
		}()

		next.ServeHTTP(w, r)
	})
}
EOF

# ------------------------------------------------------------
# Health / readiness
# ------------------------------------------------------------

cat > shared/http/health.go <<'EOF'
package http

import (
	"net/http"
	"time"
)

type HealthResponse struct {
	Status    string    `json:"status"`
	Service   string    `json:"service"`
	Timestamp time.Time `json:"timestamp"`
}

type ReadinessChecker interface {
	Ready() bool
}

type StaticReadiness struct {
	ready bool
}

func NewStaticReadiness(ready bool) *StaticReadiness {
	return &StaticReadiness{
		ready: ready,
	}
}

func (r *StaticReadiness) Ready() bool {
	return r.ready
}

func HealthHandler(service string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		WriteJSON(w, http.StatusOK, HealthResponse{
			Status:    "ok",
			Service:   service,
			Timestamp: time.Now().UTC(),
		})
	})
}

func ReadinessHandler(
	service string,
	checker ReadinessChecker,
) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !checker.Ready() {
			WriteJSON(w, http.StatusServiceUnavailable, HealthResponse{
				Status:    "not_ready",
				Service:   service,
				Timestamp: time.Now().UTC(),
			})

			return
		}

		WriteJSON(w, http.StatusOK, HealthResponse{
			Status:    "ready",
			Service:   service,
			Timestamp: time.Now().UTC(),
		})
	})
}
EOF

# ------------------------------------------------------------
# API router
# ------------------------------------------------------------

cat > shared/http/router.go <<'EOF'
package http

import (
	"net/http"
)

func NewRouter(
	service string,
	readiness ReadinessChecker,
) http.Handler {
	mux := http.NewServeMux()

	mux.Handle(
		"GET /api/v1/health",
		HealthHandler(service),
	)

	mux.Handle(
		"GET /api/v1/ready",
		ReadinessHandler(service, readiness),
	)

	// Explicit API version root.
	mux.HandleFunc(
		"GET /api/v1",
		func(w http.ResponseWriter, r *http.Request) {
			WriteJSON(w, http.StatusOK, map[string]any{
				"service": service,
				"version": "v1",
			})
		},
	)

	handler := http.Handler(mux)

	handler = Recover(handler)
	handler = SecurityHeaders(handler)
	handler = RequestMetadata(handler)
	handler = RequireJSON(handler)

	return handler
}
EOF

# ------------------------------------------------------------
# Executable API server
# ------------------------------------------------------------

cat > cmd/kirilock-api/main.go <<'EOF'
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

	"github.com/kirilock/backend/shared/config"
	khttp "github.com/kirilock/backend/shared/http"
)

const serviceName = "kirilock-api"

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("configuration error: %v", err)
	}

	readiness := khttp.NewStaticReadiness(true)

	router := khttp.NewRouter(
		serviceName,
		readiness,
	)

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

	readiness = khttp.NewStaticReadiness(false)

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
EOF

# ------------------------------------------------------------
# HTTP tests
# ------------------------------------------------------------

cat > shared/http/router_test.go <<'EOF'
package http

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHealthEndpoint(t *testing.T) {
	router := NewRouter(
		"kirilock-test",
		NewStaticReadiness(true),
	)

	req := httptest.NewRequest(
		http.MethodGet,
		"/api/v1/health",
		nil,
	)

	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rec.Code)
	}

	if rec.Header().Get(HeaderRequestID) == "" {
		t.Fatal("expected request ID")
	}

	var response HealthResponse

	if err := json.NewDecoder(rec.Body).Decode(&response); err != nil {
		t.Fatalf("invalid JSON response: %v", err)
	}

	if response.Status != "ok" {
		t.Fatalf("expected status ok, got %q", response.Status)
	}
}

func TestReadinessEndpoint(t *testing.T) {
	router := NewRouter(
		"kirilock-test",
		NewStaticReadiness(false),
	)

	req := httptest.NewRequest(
		http.MethodGet,
		"/api/v1/ready",
		nil,
	)

	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusServiceUnavailable {
		t.Fatalf("expected 503, got %d", rec.Code)
	}
}

func TestUnsupportedContentType(t *testing.T) {
	router := NewRouter(
		"kirilock-test",
		NewStaticReadiness(true),
	)

	req := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/test",
		nil,
	)

	req.Header.Set("Content-Type", "text/plain")

	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusUnsupportedMediaType {
		t.Fatalf("expected 415, got %d", rec.Code)
	}
}

func TestRequestIDPropagation(t *testing.T) {
	router := NewRouter(
		"kirilock-test",
		NewStaticReadiness(true),
	)

	req := httptest.NewRequest(
		http.MethodGet,
		"/api/v1/health",
		nil,
	)

	req.Header.Set(HeaderRequestID, "test-request-123")
	req.Header.Set(HeaderCorrelationID, "test-correlation-456")

	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if got := rec.Header().Get(HeaderRequestID); got != "test-request-123" {
		t.Fatalf("unexpected request ID: %q", got)
	}

	if got := rec.Header().Get(HeaderCorrelationID); got != "test-correlation-456" {
		t.Fatalf("unexpected correlation ID: %q", got)
	}
}

func TestInvalidRequestIDIsReplaced(t *testing.T) {
	router := NewRouter(
		"kirilock-test",
		NewStaticReadiness(true),
	)

	req := httptest.NewRequest(
		http.MethodGet,
		"/api/v1/health",
		nil,
	)

	req.Header.Set(HeaderRequestID, "bad value\nforged")

	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Header().Get(HeaderRequestID) == "bad value\nforged" {
		t.Fatal("invalid request ID was accepted")
	}

	if rec.Header().Get(HeaderRequestID) == "" {
		t.Fatal("expected generated request ID")
	}
}
EOF

# ------------------------------------------------------------
# Formatting
# ------------------------------------------------------------

echo
echo "==> Formatting"
gofmt -w \
    cmd/kirilock-api \
    shared/http

# ------------------------------------------------------------
# Tests
# ------------------------------------------------------------

echo
echo "==> Running tests"
go test ./...

# ------------------------------------------------------------
# Static analysis
# ------------------------------------------------------------

echo
echo "==> Running vet"
go vet ./...

# ------------------------------------------------------------
# Build
# ------------------------------------------------------------

echo
echo "==> Building API server"
mkdir -p bin

go build \
	-o bin/kirilock-api \
	./cmd/kirilock-api

echo
echo "=============================================="
echo " KiriLock HTTP FOUNDATION PASSED"
echo "=============================================="

echo
echo "Binary:"
ls -lh bin/kirilock-api
