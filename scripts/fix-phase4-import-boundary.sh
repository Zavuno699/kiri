#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo
echo "============================================================"
echo " KiriLock Phase 4 — Fix Import Boundaries"
echo "============================================================"
echo

###############################################################################
# 1. Remove the incorrect service-specific dependency from shared/http.
###############################################################################

rm -f shared/http/api_routes.go

###############################################################################
# 2. Restore shared/http.NewRouter as the generic infrastructure router.
#
# shared/http may depend on shared packages only.
# It must NOT import billing-service, lease-service, lock-service, etc.
###############################################################################

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

###############################################################################
# 3. Build the application composition in cmd/kirilock-api.
#
# Dependency direction:
#
# cmd/kirilock-api
#       ↓
# billing-service
#       ↓
# shared
#
# shared/http remains independent of billing-service.
###############################################################################

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

	"github.com/kirilock/backend/billing-service/internal/handler"
	"github.com/kirilock/backend/billing-service/internal/service"
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
	// Application composition belongs here.
	// Shared packages remain unaware of individual business services.
	// -------------------------------------------------------------------------

	validator := validation.New()
	paymentService := service.NewPaymentService()
	paymentHandler := handler.NewPaymentHandler(
		validator,
		paymentService,
	)

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

	// Billing endpoints.
	mux.Handle(
		"POST /api/v1/payments",
		paymentHandler,
	)

	// Shared HTTP middleware.
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
EOF

###############################################################################
# 4. Verify there is no remaining illegal dependency.
###############################################################################

echo "==> Checking shared/http dependency boundary"

if grep -RniE \
	'github.com/kirilock/backend/(billing-service|lease-service|lock-service|security-service|hardware-controller)' \
	shared/http \
	--include='*.go' \
	2>/dev/null; then

	echo
	echo "ERROR: shared/http contains a service dependency."
	exit 1
fi

echo "    shared/http → service dependencies: NONE"

###############################################################################
# 5. Format
###############################################################################

echo "==> Formatting"

gofmt -w \
	shared/http/router.go \
	cmd/kirilock-api/main.go

###############################################################################
# 6. Test
###############################################################################

echo "==> Running all tests"
go test ./...

echo "==> Running race detector"
go test -race ./...

echo "==> Running vet"
go vet ./...

###############################################################################
# 7. Build
###############################################################################

echo "==> Building API"

mkdir -p bin

go build \
	-o bin/kirilock-api \
	./cmd/kirilock-api

###############################################################################
# 8. Dependency graph sanity check
###############################################################################

echo "==> Checking package dependency graph"

go list -deps ./cmd/kirilock-api >/tmp/kirilock-deps.txt

if grep -q '^github.com/kirilock/backend/shared/http$' /tmp/kirilock-deps.txt &&
   grep -q '^github.com/kirilock/backend/billing-service/internal/handler$' /tmp/kirilock-deps.txt &&
   grep -q '^github.com/kirilock/backend/billing-service/internal/service$' /tmp/kirilock-deps.txt; then
	echo "    API composition dependencies: OK"
else
	echo "ERROR: expected application dependencies are missing"
	exit 1
fi

echo
echo "============================================================"
echo " KiriLock Phase 4 Import Boundary FIXED"
echo "============================================================"
echo
echo "Verified:"
echo "  No shared/http → billing dependency     OK"
echo "  No import cycle                         OK"
echo "  Internal package boundary               OK"
echo "  All tests                               OK"
echo "  Race detector                           OK"
echo "  go vet                                  OK"
echo "  API build                               OK"
echo
ls -lh bin/kirilock-api
