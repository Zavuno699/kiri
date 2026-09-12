#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo
echo "============================================================"
echo " KiriLock Phase 4 — HTTP Contract Inspection"
echo "============================================================"
echo

echo "==> Go module"
cat go.mod
echo

echo "==> Billing service files"
find billing-service -type f -name '*.go' -print | sort
echo

echo "==> Existing HTTP files"
find shared/http -type f -name '*.go' -print | sort
echo

echo "==> Existing payment-related code"
grep -RniE \
    'Payment|payment|LeasePayment|Idempotency|idempotency' \
    billing-service tests/contract shared \
    --include='*.go' \
    2>/dev/null || true
echo

echo "==> Existing routes / handlers"
grep -RniE \
    'HandleFunc|NewServeMux|Route|POST|GET|/api/' \
    billing-service cmd shared \
    --include='*.go' \
    2>/dev/null || true
echo

echo "==> Existing validation implementation"
find shared/validation -type f -maxdepth 1 -name '*.go' -print | sort
echo
sed -n '1,260p' shared/validation/validation.go
echo

echo "==> Existing HTTP response implementation"
sed -n '1,320p' shared/http/response.go 2>/dev/null || true
echo

echo "==> Existing HTTP request implementation"
sed -n '1,320p' shared/http/request.go 2>/dev/null || true
echo

echo "==> Existing HTTP router"
sed -n '1,360p' shared/http/router.go 2>/dev/null || true
echo

echo "==> Existing API server"
find cmd -type f -name '*.go' -maxdepth 3 -print -exec sh -c '
    echo
    echo "----- $1 -----"
    sed -n "1,360p" "$1"
' _ {} \;
echo

echo "==> Current test tree"
find tests -type f -name '*.go' -print | sort
echo

echo "============================================================"
echo " Inspection complete"
echo "============================================================"
