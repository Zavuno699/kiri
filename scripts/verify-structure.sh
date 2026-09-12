#!/usr/bin/env bash

set -Eeuo pipefail

required=(
    "shared/config"
    "shared/errors"
    "shared/events"
    "shared/http"
    "shared/logging"
    "shared/metadata"
    "shared/types"
    "shared/validation"

    "identity-service"
    "billing-service"
    "lease-service"
    "lock-service"
    "security-service"
    "hardware-controller"

    "api/openapi"
    "api/schemas"

    "events/payment"
    "events/lease"
    "events/lock"
    "events/security"
    "events/device"

    "database/migrations"
    "database/seeds"

    "tests/integration"
    "tests/contract"
    "tests/e2e"

    "docs/architecture"
    "docs/api"
    "docs/events"
    "docs/security"
    "docs/operations"
)

failed=0

for path in "${required[@]}"; do
    if [[ -d "$path" ]]; then
        printf 'OK      %s\n' "$path"
    else
        printf 'MISSING %s\n' "$path"
        failed=1
    fi
done

if [[ ! -f go.mod ]]; then
    echo "MISSING go.mod"
    failed=1
else
    echo "OK      go.mod"
fi

if [[ "$failed" -ne 0 ]]; then
    echo
    echo "Backend structure verification FAILED."
    exit 1
fi

echo
echo "Backend structure verification PASSED."
