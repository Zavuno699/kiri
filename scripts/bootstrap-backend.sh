#!/usr/bin/env bash

set -Eeuo pipefail

PROJECT_NAME="kirilock"
BACKEND_DIR="${PROJECT_NAME}/backend"
MODULE_NAME="github.com/kirilock/backend"

echo "==> Creating KiriLock backend structure..."

mkdir -p "${BACKEND_DIR}"

cd "${BACKEND_DIR}"

# -------------------------------------------------------------------
# Shared backend foundation
# -------------------------------------------------------------------

mkdir -p shared/{config,errors,events,http,logging,metadata,types,validation}

# -------------------------------------------------------------------
# Core services
# -------------------------------------------------------------------

mkdir -p identity-service/{cmd,internal/{handler,service,repository,model}}
mkdir -p billing-service/{cmd,internal/{handler,service,repository,model}}
mkdir -p lease-service/{cmd,internal/{handler,service,repository,model}}
mkdir -p lock-service/{cmd,internal/{handler,service,repository,model}}
mkdir -p security-service/{cmd,internal/{handler,service,repository,model}}
mkdir -p hardware-controller/{cmd,internal/{handler,service,repository,model}}

# -------------------------------------------------------------------
# API contracts
# -------------------------------------------------------------------

mkdir -p api/{openapi,schemas}

# -------------------------------------------------------------------
# Events
# -------------------------------------------------------------------

mkdir -p events/{payment,lease,lock,security,device}

# -------------------------------------------------------------------
# Database
# -------------------------------------------------------------------

mkdir -p database/{migrations,seeds}

# -------------------------------------------------------------------
# Tests
# -------------------------------------------------------------------

mkdir -p tests/{integration,contract,e2e}

# -------------------------------------------------------------------
# Documentation
# -------------------------------------------------------------------

mkdir -p docs/{architecture,api,events,security,operations}

# -------------------------------------------------------------------
# Configuration
# -------------------------------------------------------------------

mkdir -p configs

# -------------------------------------------------------------------
# Go module
# -------------------------------------------------------------------

if command -v go >/dev/null 2>&1; then
    echo "==> Initializing Go module..."

    if [[ ! -f go.mod ]]; then
        go mod init "${MODULE_NAME}"
    else
        echo "    go.mod already exists; leaving it unchanged."
    fi
else
    echo "WARNING: Go is not installed."
    echo "         Directory structure was created, but go.mod was not initialized."
fi

# -------------------------------------------------------------------
# Root backend files
# -------------------------------------------------------------------

cat > README.md <<'EOF'
# KiriLock Backend

KiriLock backend services.

## Architecture principles

- Strong compile-time typing
- Strict request validation
- Explicit normalization
- Explicit authorization
- Explicit domain/business validation
- Versioned API contracts
- Versioned event contracts
- Structured metadata
- Structured errors
- Idempotent financial operations
- Transactional persistence
- Observable services
- Backward-compatible evolution

## Service boundaries

- identity-service
- billing-service
- lease-service
- lock-service
- security-service
- hardware-controller

## Shared packages

The `shared/` directory contains infrastructure and contracts shared
between services.

Business/domain logic should remain inside the owning service.
EOF

cat > .gitignore <<'EOF'
# Binaries
/bin/
/dist/
/build/

# Go
*.test
*.out
coverage.out
coverage.html

# Environment
.env
.env.*
!.env.example

# IDE
.idea/
.vscode/

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Temporary files
tmp/
.tmp/
EOF

cat > .env.example <<'EOF'
# KiriLock backend environment

APP_ENV=development
APP_NAME=kirilock

# HTTP
HTTP_HOST=0.0.0.0
HTTP_PORT=8080

# Database
DATABASE_URL=

# Redis
REDIS_URL=

# Kafka
KAFKA_BROKERS=

# Security
JWT_ISSUER=
JWT_AUDIENCE=

# Observability
LOG_LEVEL=info
EOF

# -------------------------------------------------------------------
# Shared package documentation
# -------------------------------------------------------------------

cat > shared/README.md <<'EOF'
# Shared Backend Foundation

Shared infrastructure used by KiriLock services.

## Packages

### config
Application configuration loading and validation.

### errors
Canonical API/domain error definitions.

### events
Event envelope and event infrastructure.

### http
HTTP server, middleware, request/response helpers.

### logging
Structured logging.

### metadata
Common metadata attached to entities and events.

### types
Shared strongly typed primitives.

### validation
Request and domain validation infrastructure.

Shared packages must remain generic.

Do not place service-specific business rules here.
EOF

# -------------------------------------------------------------------
# Metadata foundation
# -------------------------------------------------------------------

cat > shared/metadata/metadata.go <<'EOF'
package metadata

import "time"

// Metadata contains common lifecycle information shared by
// persistent domain objects.
//
// Metadata is intentionally small and stable because it forms
// part of the foundation for future API and documentation growth.
type Metadata struct {
	ID            string    `json:"id"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
	Version       int       `json:"version"`
	CorrelationID string    `json:"correlation_id,omitempty"`
}
EOF

# -------------------------------------------------------------------
# Event foundation
# -------------------------------------------------------------------

cat > shared/events/envelope.go <<'EOF'
package events

import "time"

// EventMetadata contains transport-independent metadata describing
// an event.
type EventMetadata struct {
	EventID       string    `json:"event_id"`
	EventType     string    `json:"event_type"`
	EventVersion  int       `json:"event_version"`
	OccurredAt    time.Time `json:"occurred_at"`
	CorrelationID string    `json:"correlation_id"`
	CausationID   string    `json:"causation_id,omitempty"`
	Producer      string    `json:"producer"`
}

// EventEnvelope is the common wrapper for all KiriLock events.
//
// Payloads should be versioned independently from the envelope.
type EventEnvelope struct {
	Metadata EventMetadata `json:"metadata"`
	TenantID string        `json:"tenant_id,omitempty"`
	DeviceID string        `json:"device_id,omitempty"`
	Payload  any           `json:"payload"`
}
EOF

# -------------------------------------------------------------------
# Error foundation
# -------------------------------------------------------------------

cat > shared/errors/errors.go <<'EOF'
package errors

import "net/http"

type Code string

const (
	CodeValidation      Code = "VALIDATION_ERROR"
	CodeUnauthorized    Code = "UNAUTHORIZED"
	CodeForbidden       Code = "FORBIDDEN"
	CodeNotFound        Code = "NOT_FOUND"
	CodeConflict        Code = "CONFLICT"
	CodeIdempotency     Code = "IDEMPOTENCY_ERROR"
	CodeDomain          Code = "DOMAIN_ERROR"
	CodeInternal        Code = "INTERNAL_ERROR"
	CodeUnavailable     Code = "SERVICE_UNAVAILABLE"
)

type APIError struct {
	Code      Code             `json:"code"`
	Message   string           `json:"message"`
	RequestID string           `json:"request_id,omitempty"`
	Fields    map[string][]string `json:"fields,omitempty"`
}

func (e APIError) HTTPStatus() int {
	switch e.Code {
	case CodeValidation:
		return http.StatusBadRequest
	case CodeUnauthorized:
		return http.StatusUnauthorized
	case CodeForbidden:
		return http.StatusForbidden
	case CodeNotFound:
		return http.StatusNotFound
	case CodeConflict, CodeIdempotency:
		return http.StatusConflict
	case CodeUnavailable:
		return http.StatusServiceUnavailable
	default:
		return http.StatusInternalServerError
	}
}
EOF

# -------------------------------------------------------------------
# Validation foundation
# -------------------------------------------------------------------

cat > shared/validation/README.md <<'EOF'
# Validation

Validation follows this pipeline:

1. Content-Type validation
2. Strict JSON decoding
3. Structural validation
4. Normalization
5. Field validation
6. Cross-field validation
7. Authorization
8. Domain/business validation
9. Transaction execution

Validation is not authorization.

Validation is not business logic.

Normalization must be explicit and deterministic.

Financial and security-sensitive values must never be silently
coerced into a different semantic value.
EOF

# -------------------------------------------------------------------
# Event documentation
# -------------------------------------------------------------------

cat > events/README.md <<'EOF'
# KiriLock Events

Internal asynchronous events.

Initial event families:

- payment
- lease
- lock
- security
- device

Commands and events must remain conceptually separate.

Examples:

Commands:
- payment.command
- lock.command
- lease.command

Events:
- payment.settled
- payment.failed
- lock.command.result
- lock.state.changed
- lease.lifecycle.events
- security.alarm.tamper
- security.alarm.state
- security.countermeasure
- device.heartbeat
- device.telemetry
EOF

# -------------------------------------------------------------------
# Service READMEs
# -------------------------------------------------------------------

services=(
    "identity-service"
    "billing-service"
    "lease-service"
    "lock-service"
    "security-service"
    "hardware-controller"
)

for service in "${services[@]}"; do
    cat > "${service}/README.md" <<EOF
# ${service}

KiriLock backend service.

## Responsibilities

Business responsibilities for this service must remain isolated
from other services.

## Structure

- cmd/
- internal/handler/
- internal/service/
- internal/repository/
- internal/model/

The service must expose explicit interfaces between these layers.

Do not place business logic inside HTTP handlers.
EOF
done

# -------------------------------------------------------------------
# API documentation
# -------------------------------------------------------------------

cat > api/README.md <<'EOF'
# API Contracts

API contracts are versioned.

OpenAPI specifications belong in:

    api/openapi/

Schema definitions belong in:

    api/schemas/

API changes must consider backward compatibility.
EOF

# -------------------------------------------------------------------
# Documentation index
# -------------------------------------------------------------------

cat > docs/README.md <<'EOF'
# KiriLock Backend Documentation

- architecture/
- api/
- events/
- security/
- operations/

Documentation should distinguish:

1. Specification
2. Implementation
3. Verified guarantee

No performance, security, infrastructure, or compliance guarantee
should be documented as verified until it is actually tested.
EOF

# -------------------------------------------------------------------
# Backend verification script
# -------------------------------------------------------------------

mkdir -p scripts

cat > scripts/verify-structure.sh <<'EOF'
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
EOF

chmod +x scripts/verify-structure.sh

# -------------------------------------------------------------------
# Final verification
# -------------------------------------------------------------------

echo
echo "==> KiriLock backend structure created."
echo
echo "Location:"
pwd
echo

if command -v tree >/dev/null 2>&1; then
    tree -a -L 4
else
    find . -maxdepth 4 -type f -o -type d | sort
fi

echo
echo "==> Running structural verification..."
./scripts/verify-structure.sh

echo
echo "==> Bootstrap complete."

