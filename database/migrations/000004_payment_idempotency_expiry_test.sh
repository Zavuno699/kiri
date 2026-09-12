#!/usr/bin/env bash
set -euo pipefail

MIGRATION="database/migrations/000004_payment_idempotency_expiry.sql"

echo "== KiriLock: migration 000004 contract =="

test -f "$MIGRATION"

grep -q "ALTER TABLE payment_idempotency_claims" "$MIGRATION"
grep -q "ADD COLUMN IF NOT EXISTS expires_at" "$MIGRATION"
grep -q "TIMESTAMPTZ NOT NULL" "$MIGRATION"
grep -q "INTERVAL '2 minutes'" "$MIGRATION"
grep -q "payment_idempotency_claims_expiry_idx" "$MIGRATION"
grep -q "ON payment_idempotency_claims (status, expires_at)" "$MIGRATION"

echo "Migration file                    OK"
echo "expires_at column                 OK"
echo "2-minute default expiry           OK"
echo "expiry index                      OK"
echo "status + expires_at index         OK"
echo
echo "KiriLock MIGRATION 000004 PASSED"
