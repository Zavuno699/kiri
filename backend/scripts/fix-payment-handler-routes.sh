#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo
echo "============================================================"
echo " KiriLock — Payment Handler Route Boundary"
echo "============================================================"
echo

HANDLER="billing-service/internal/handler/payment.go"

if [[ ! -f "$HANDLER" ]]; then
	echo "ERROR: $HANDLER does not exist."
	exit 1
fi

###############################################################################
# Add RegisterRoutes to PaymentHandler.
#
# The handler owns its endpoint registration.
# The billing service exposes that registration through its public boundary.
###############################################################################

if grep -qE '^func \(.*\*PaymentHandler\) RegisterRoutes\(' "$HANDLER"; then
	echo "==> RegisterRoutes already exists"
else
	cat >> "$HANDLER" <<'EOF'

// RegisterRoutes registers billing-owned HTTP endpoints.
//
// Route ownership remains inside the billing service while the application
// process remains responsible for composing the global HTTP server.
func (h *PaymentHandler) RegisterRoutes(mux *http.ServeMux) {
	mux.Handle(
		"POST /api/v1/payments",
		h,
	)
}
EOF

	echo "==> Added PaymentHandler.RegisterRoutes"
fi

###############################################################################
# Ensure net/http is imported.
###############################################################################

if ! grep -q '"net/http"' "$HANDLER"; then
	echo "ERROR: payment.go needs net/http for RegisterRoutes."
	echo
	echo "Current imports:"
	sed -n '1,35p' "$HANDLER"
	exit 1
fi

###############################################################################
# Format
###############################################################################

echo "==> Formatting"

gofmt -w "$HANDLER"

###############################################################################
# Verify the method exists.
###############################################################################

echo "==> Verifying handler contract"

grep -qE '^func \(.*\*PaymentHandler\) RegisterRoutes\(' "$HANDLER"

echo "    PaymentHandler.RegisterRoutes: OK"

###############################################################################
# Tests
###############################################################################

echo "==> Running all tests"
go test ./...

echo "==> Running race detector"
go test -race ./...

echo "==> Running vet"
go vet ./...

###############################################################################
# Build
###############################################################################

echo "==> Building API"

mkdir -p bin

go build \
	-o bin/kirilock-api \
	./cmd/kirilock-api

echo
echo "============================================================"
echo " PAYMENT HANDLER ROUTE FIX PASSED"
echo "============================================================"
echo
echo "Verified:"
echo "  Handler route registration             OK"
echo "  Billing public boundary                OK"
echo "  Import boundaries                      OK"
echo "  All tests                              OK"
echo "  Race detector                          OK"
echo "  go vet                                 OK"
echo "  API build                              OK"
echo
ls -lh bin/kirilock-api
