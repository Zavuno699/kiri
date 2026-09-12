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
	ID               uuid.UUID
	TenantID         uuid.UUID
	PropertyID       uuid.UUID
	Status           LeaseStatus
	EntitlementFrom  time.Time
	EntitlementUntil time.Time
	GraceUntil       time.Time
	ComplianceUntil  time.Time
	CreatedAt        time.Time
	UpdatedAt        time.Time
	Version          int64
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
