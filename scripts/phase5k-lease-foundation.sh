#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "== KiriLock Phase 5K: Lease Domain Foundation =="

mkdir -p \
  lease-service/cmd \
  lease-service/internal/handler \
  lease-service/internal/model \
  lease-service/internal/repository \
  lease-service/internal/service \
  database/migrations \
  events/lease

# ------------------------------------------------------------
# Lease model
# ------------------------------------------------------------

cat > lease-service/internal/model/lease.go <<'EOF'
package model

import (
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"
)

type LeaseStatus string

const (
	LeaseActive      LeaseStatus = "ACTIVE"
	LeaseGracePeriod LeaseStatus = "GRACE_PERIOD"
	LeaseLocked      LeaseStatus = "LOCKED"
)

type Lease struct {
	ID             uuid.UUID
	TenantID       uuid.UUID
	PropertyID     uuid.UUID
	Status         LeaseStatus
	EntitlementFrom time.Time
	EntitlementUntil time.Time
	GraceUntil      time.Time
	ComplianceUntil time.Time
	CreatedAt      time.Time
	UpdatedAt      time.Time
	Version        int64
}

func (l Lease) Validate() error {
	if l.ID == uuid.Nil {
		return errors.New("lease ID is required")
	}

	if l.TenantID == uuid.Nil {
		return errors.New("tenant ID is required")
	}

	if l.PropertyID == uuid.Nil {
		return errors.New("property ID is required")
	}

	switch l.Status {
	case LeaseActive, LeaseGracePeriod, LeaseLocked:
	default:
		return errors.New("invalid lease status")
	}

	if l.EntitlementFrom.IsZero() {
		return errors.New("entitlement start is required")
	}

	if l.EntitlementUntil.IsZero() {
		return errors.New("entitlement end is required")
	}

	if !l.EntitlementUntil.After(l.EntitlementFrom) {
		return errors.New("entitlement end must be after entitlement start")
	}

	if l.GraceUntil.IsZero() {
		return errors.New("grace deadline is required")
	}

	if l.ComplianceUntil.IsZero() {
		return errors.New("compliance deadline is required")
	}

	if l.GraceUntil.Before(l.EntitlementUntil) {
		return errors.New("grace deadline cannot precede entitlement expiry")
	}

	if l.ComplianceUntil.Before(l.GraceUntil) {
		return errors.New("compliance deadline cannot precede grace deadline")
	}

	if l.CreatedAt.IsZero() {
		return errors.New("created_at is required")
	}

	if l.UpdatedAt.IsZero() {
		return errors.New("updated_at is required")
	}

	if l.Version < 1 {
		return errors.New("lease version must be positive")
	}

	return nil
}

func NormalizeLeaseStatus(status LeaseStatus) LeaseStatus {
	return LeaseStatus(strings.ToUpper(strings.TrimSpace(string(status))))
}
EOF

# ------------------------------------------------------------
# Lease lifecycle rules
# ------------------------------------------------------------

cat > lease-service/internal/service/lifecycle.go <<'EOF'
package service

import (
	"errors"
	"time"

	"github.com/kirilock/backend/lease-service/internal/model"
)

func DetermineStatus(
	now time.Time,
	entitlementUntil time.Time,
	graceUntil time.Time,
	complianceUntil time.Time,
) (model.LeaseStatus, error) {
	if now.IsZero() {
		return "", errors.New("current time is required")
	}

	if entitlementUntil.IsZero() {
		return "", errors.New("entitlement expiry is required")
	}

	if graceUntil.IsZero() {
		return "", errors.New("grace deadline is required")
	}

	if complianceUntil.IsZero() {
		return "", errors.New("compliance deadline is required")
	}

	if graceUntil.Before(entitlementUntil) {
		return "", errors.New("grace deadline cannot precede entitlement expiry")
	}

	if complianceUntil.Before(graceUntil) {
		return "", errors.New("compliance deadline cannot precede grace deadline")
	}

	switch {
	case now.Before(entitlementUntil):
		return model.LeaseActive, nil
	case now.Before(graceUntil):
		return model.LeaseGracePeriod, nil
	default:
		return model.LeaseLocked, nil
	}
}

func CanUnlock(status model.LeaseStatus) bool {
	return status == model.LeaseActive || status == model.LeaseGracePeriod
}

func CanRestoreAfterPayment(status model.LeaseStatus) bool {
	switch status {
	case model.LeaseActive, model.LeaseGracePeriod, model.LeaseLocked:
		return true
	default:
		return false
	}
}
EOF

# ------------------------------------------------------------
# Lease application service
# ------------------------------------------------------------

cat > lease-service/internal/service/lease.go <<'EOF'
package service

import (
	"errors"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/lease-service/internal/model"
)

type LeaseService struct{}

func New() *LeaseService {
	return &LeaseService{}
}

func (s *LeaseService) BuildLease(
	tenantID uuid.UUID,
	propertyID uuid.UUID,
	entitlementFrom time.Time,
	entitlementUntil time.Time,
	graceUntil time.Time,
	complianceUntil time.Time,
	now time.Time,
) (model.Lease, error) {
	if tenantID == uuid.Nil {
		return model.Lease{}, errors.New("tenant ID is required")
	}

	if propertyID == uuid.Nil {
		return model.Lease{}, errors.New("property ID is required")
	}

	status, err := DetermineStatus(
		now,
		entitlementUntil,
		graceUntil,
		complianceUntil,
	)
	if err != nil {
		return model.Lease{}, err
	}

	createdAt := now.UTC()

	lease := model.Lease{
		ID:               uuid.New(),
		TenantID:         tenantID,
		PropertyID:       propertyID,
		Status:            status,
		EntitlementFrom:  entitlementFrom.UTC(),
		EntitlementUntil: entitlementUntil.UTC(),
		GraceUntil:       graceUntil.UTC(),
		ComplianceUntil:  complianceUntil.UTC(),
		CreatedAt:        createdAt,
		UpdatedAt:        createdAt,
		Version:          1,
	}

	if err := lease.Validate(); err != nil {
		return model.Lease{}, err
	}

	return lease, nil
}
EOF

# ------------------------------------------------------------
# Lease repository boundary
# ------------------------------------------------------------

cat > lease-service/internal/repository/errors.go <<'EOF'
package repository

import "errors"

var (
	ErrLeaseNotFound      = errors.New("lease not found")
	ErrLeaseAlreadyLocked = errors.New("lease already locked")
	ErrLeaseVersionConflict = errors.New("lease version conflict")
)
EOF

cat > lease-service/internal/repository/lease.go <<'EOF'
package repository

import (
	"context"

	"github.com/google/uuid"

	"github.com/kirilock/backend/lease-service/internal/model"
)

type LeaseRepository interface {
	Create(ctx context.Context, lease model.Lease) error
	GetByID(ctx context.Context, id uuid.UUID) (model.Lease, error)
	GetByTenantID(ctx context.Context, tenantID uuid.UUID) (model.Lease, error)
	UpdateStatus(
		ctx context.Context,
		id uuid.UUID,
		expectedVersion int64,
		status model.LeaseStatus,
	) error
}
EOF

# ------------------------------------------------------------
# Lease HTTP service boundary
# ------------------------------------------------------------

cat > lease-service/service.go <<'EOF'
package lease

import (
	"net/http"

	"github.com/kirilock/backend/lease-service/internal/handler"
	"github.com/kirilock/backend/lease-service/internal/service"
)

type Service struct {
	leaseService *service.LeaseService
}

func New() *Service {
	return &Service{
		leaseService: service.New(),
	}
}

func (s *Service) RegisterRoutes(mux *http.ServeMux) {
	handler.RegisterRoutes(mux, s.leaseService)
}
EOF

cat > lease-service/internal/handler/routes.go <<'EOF'
package handler

import (
	"net/http"

	"github.com/kirilock/backend/lease-service/internal/service"
)

func RegisterRoutes(
	mux *http.ServeMux,
	_ *service.LeaseService,
) {
	mux.HandleFunc("GET /api/v1/leases/health", func(
		w http.ResponseWriter,
		_ *http.Request,
	) {
		w.WriteHeader(http.StatusNoContent)
	})
}
EOF

# ------------------------------------------------------------
# Lease database migration
# ------------------------------------------------------------

cat > database/migrations/000005_leases.sql <<'EOF'
CREATE TABLE IF NOT EXISTS leases (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    property_id UUID NOT NULL,

    status STRING NOT NULL,

    entitlement_from TIMESTAMPTZ NOT NULL,
    entitlement_until TIMESTAMPTZ NOT NULL,

    grace_until TIMESTAMPTZ NOT NULL,
    compliance_until TIMESTAMPTZ NOT NULL,

    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,

    version INT8 NOT NULL DEFAULT 1,

    CONSTRAINT leases_status_check
        CHECK (status IN ('ACTIVE', 'GRACE_PERIOD', 'LOCKED')),

    CONSTRAINT leases_entitlement_window_check
        CHECK (entitlement_until > entitlement_from),

    CONSTRAINT leases_grace_window_check
        CHECK (grace_until >= entitlement_until),

    CONSTRAINT leases_compliance_window_check
        CHECK (compliance_until >= grace_until),

    CONSTRAINT leases_version_check
        CHECK (version >= 1)
);

CREATE INDEX IF NOT EXISTS leases_tenant_id_idx
    ON leases (tenant_id);

CREATE INDEX IF NOT EXISTS leases_property_id_idx
    ON leases (property_id);

CREATE INDEX IF NOT EXISTS leases_status_idx
    ON leases (status);

CREATE INDEX IF NOT EXISTS leases_expiry_idx
    ON leases (status, entitlement_until, grace_until, compliance_until);
EOF

# ------------------------------------------------------------
# Event contract
# ------------------------------------------------------------

cat > events/lease/lease.lifecycle.events.json <<'EOF'
{
  "event_family": "lease.lifecycle",
  "version": 1,
  "events": [
    {
      "type": "lease.created"
    },
    {
      "type": "lease.status.changed"
    },
    {
      "type": "lease.entitlement.extended"
    },
    {
      "type": "lease.lockout.required"
    }
  ],
  "metadata": {
    "event_id": "uuid",
    "event_type": "string",
    "event_version": "integer",
    "occurred_at": "RFC3339 timestamp",
    "correlation_id": "string",
    "causation_id": "string",
    "producer": "string"
  }
}
EOF

cat > events/lease/README.md <<'EOF'
# KiriLock Lease Events

Lease lifecycle events are internal domain events.

The lease service is authoritative for lease state.

Consumers must not infer entitlement from payment-provider status alone.

A payment settlement may cause a lease entitlement change, but the resulting
lease state must be persisted by the lease domain before downstream lock
authorization changes are considered authoritative.

Event metadata must include:

- event_id
- event_type
- event_version
- occurred_at
- correlation_id
- optional causation_id
- producer
EOF

# ------------------------------------------------------------
# Service documentation
# ------------------------------------------------------------

cat > lease-service/README.md <<'EOF'
# KiriLock Lease Service

The Lease Service is the authoritative domain service for prepaid lease
entitlement and lifecycle state.

## States

- `ACTIVE`
- `GRACE_PERIOD`
- `LOCKED`

## Rules

Before entitlement expiry:

`ACTIVE`

After entitlement expiry but before the compliance deadline:

`GRACE_PERIOD`

After the compliance deadline:

`LOCKED`

Payment settlement may extend entitlement and restore an eligible lease.

The Lease Service does not directly trust client claims or payment-provider
status as authorization.

Lock authorization must consume authoritative lease state.

## Design principle

AI systems may provide recommendations or anomaly signals, but they do not
decide lease state transitions.
EOF

# ------------------------------------------------------------
# Ensure formatting
# ------------------------------------------------------------

gofmt -w \
  lease-service \
  2>/dev/null || true

echo
echo "KiriLock PHASE 5K BUILD COMPLETE"
echo
echo "Created:"
echo "  Lease domain model"
echo "  Lease lifecycle rules"
echo "  Lease application service"
echo "  Lease repository boundary"
echo "  Lease HTTP boundary"
echo "  Lease database migration"
echo "  Lease lifecycle event contract"
echo "  Lease service documentation"
echo
echo "NO FULL REPOSITORY TEST RUN"
echo "NO DATABASE CONNECTION"
echo "NO EXTERNAL PROVIDER REQUEST"
echo
echo "Next phase: 5L = Lease persistence + entitlement application"
