#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo
echo "============================================================"
echo " KiriLock Phase 4 — Service Boundary Fix"
echo "============================================================"
echo

###############################################################################
# 1. Public billing-service composition boundary.
#
# cmd/kirilock-api is allowed to import billing-service.
# billing-service itself is allowed to import its internal packages.
# cmd/kirilock-api must never import billing-service/internal/* directly.
###############################################################################

cat > billing-service/service.go <<'EOF'
package billing

import (
	"net/http"

	"github.com/kirilock/backend/billing-service/internal/handler"
	"github.com/kirilock/backend/billing-service/internal/service"
	"github.com/kirilock/backend/shared/validation"
)

// Service owns the billing HTTP/API composition.
//
// Internal implementation details remain private to billing-service.
type Service struct {
	paymentHandler *handler.PaymentHandler
}

// New constructs the billing service and its dependencies.
func New() *Service {
	validator := validation.New()
	paymentService := service.NewPaymentService()

	return &Service{
		paymentHandler: handler.NewPaymentHandler(
			validator,
			paymentService,
		),
	}
}

// RegisterRoutes registers billing-owned HTTP routes.
//
// The application layer decides which router/mux receives these routes.
// billing-service does not own the global HTTP middleware stack.
func (s *Service) RegisterRoutes(mux *http.ServeMux) {
	s.paymentHandler.RegisterRoutes(mux)
}
EOF

###############################################################################
# 2. Rebuild API composition.
#
# cmd imports only the public billing package.
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
	"syscall"
	"time"

	billing "github.com/kirilock/backend/billing-service"
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

	// -------------------------------------------------------------------------
	// Application composition.
	//
	// The API process knows about service boundaries.
	// It does not reach into billing-service/internal/*.
	// -------------------------------------------------------------------------

	billingService := billing.New()

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

	// Global HTTP middleware.
	var router http.Handler = mux

	router = khttp.Recover(router)
	router = khttp.SecurityHeaders(router)
	router = khttp.RequestMetadata(router)
	router = khttp.RequireJSON(router)

	server := &http.Server{
		Addr:              cfg.HTTP.Host + ":" + cfg.HTTP.Port,
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
# 3. Ensure cmd does not reach into billing-service/internal.
###############################################################################

echo "==> Checking application import boundary"

if grep -RniE \
	'github.com/kirilock/backend/billing-service/internal/' \
	cmd \
	--include='*.go' \
	2>/dev/null; then

	echo
	echo "ERROR: cmd/kirilock-api imports billing-service/internal directly."
	exit 1
fi

echo "    cmd → billing-service/internal: NONE"

###############################################################################
# 4. Ensure shared/http remains service-independent.
###############################################################################

echo "==> Checking shared/http boundary"

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
	billing-service/service.go \
	cmd/kirilock-api/main.go

###############################################################################
# 6. Tests
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
# 8. Inspect dependency graph.
###############################################################################

echo "==> Verifying dependency graph"

go list -deps ./cmd/kirilock-api >/tmp/kirilock-deps.txt

grep -q '^github.com/kirilock/backend/billing-service$' \
	/tmp/kirilock-deps.txt

grep -q '^github.com/kirilock/backend/shared/http$' \
	/tmp/kirilock-deps.txt

grep -q '^github.com/kirilock/backend/shared/validation$' \
	/tmp/kirilock-deps.txt

echo "    Public service boundary: OK"
echo "    Shared HTTP dependency: OK"
echo "    Validation dependency: OK"

echo
echo "============================================================"
echo " KiriLock PHASE 4 SERVICE BOUNDARY PASSED"
echo "============================================================"
echo
echo "Verified:"
echo "  cmd → billing-service public package       OK"
echo "  cmd → billing-service/internal              BLOCKED"
echo "  shared/http → business services             NONE"
echo "  Go internal visibility                      OK"
echo "  Import cycles                               NONE"
echo "  All tests                                   OK"
echo "  Race detector                               OK"
echo "  go vet                                      OK"
echo "  API build                                   OK"
echo
ls -lh bin/kirilock-api
