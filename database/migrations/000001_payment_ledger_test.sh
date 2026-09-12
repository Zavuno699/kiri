#!/usr/bin/env bash

set -u

FILE="database/migrations/000001_payment_ledger.sql"

[ -f "$FILE" ] || {
    echo "ERROR: migration missing"
    return 1 2>/dev/null || true
}

grep -q "CREATE TABLE IF NOT EXISTS payments" "$FILE" || {
    echo "ERROR: payments table missing"
    return 1 2>/dev/null || true
}

grep -q "payments_reference_unique" "$FILE" || {
    echo "ERROR: reference uniqueness missing"
    return 1 2>/dev/null || true
}

grep -q "payments_provider_charge_unique" "$FILE" || {
    echo "ERROR: provider charge uniqueness missing"
    return 1 2>/dev/null || true
}

grep -q "payments_idempotency_unique" "$FILE" || {
    echo "ERROR: idempotency uniqueness missing"
    return 1 2>/dev/null || true
}

grep -q "payment_webhook_provider_event_unique" "$FILE" || {
    echo "ERROR: webhook replay protection missing"
    return 1 2>/dev/null || true
}

grep -q "status IN" "$FILE" || {
    echo "ERROR: payment status constraint missing"
    return 1 2>/dev/null || true
}

echo "Payment ledger migration contract: OK"
