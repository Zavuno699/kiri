package model

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type TenancyStatus string

const (
	TenancyInvited    TenancyStatus = "INVITED"
	TenancyActive     TenancyStatus = "ACTIVE"
	TenancySuspended  TenancyStatus = "SUSPENDED"
	TenancyTerminated TenancyStatus = "TERMINATED"
	TenancyExpired    TenancyStatus = "EXPIRED"
	TenancyRevoked    TenancyStatus = "REVOKED"
)

type Tenancy struct {
	ID                         uuid.UUID
	TenantSubjectID            uuid.UUID
	UnitID                     uuid.UUID
	Status                     TenancyStatus
	LeaseStartDate             time.Time
	LeaseEndDate               *time.Time
	InvitedByLandlordProfileID *uuid.UUID
	InvitationToken            string
	InvitationTokenHash        string
	InvitationExpiresAt        *time.Time
	InvitationAcceptedAt       *time.Time
	TerminatedAt               *time.Time
	TerminationReason          string
	CreatedAt                  time.Time
	UpdatedAt                  time.Time
	Version                    int
}

func (t Tenancy) Validate() error {
	if t.ID == uuid.Nil {
		return errors.New("id is required")
	}
	if t.TenantSubjectID == uuid.Nil {
		return errors.New("tenant_subject_id is required")
	}
	if t.UnitID == uuid.Nil {
		return errors.New("unit_id is required")
	}

	switch t.Status {
	case TenancyInvited, TenancyActive, TenancySuspended, TenancyTerminated, TenancyExpired, TenancyRevoked:
		// Valid
	default:
		return errors.New("invalid tenancy status")
	}

	if t.LeaseEndDate != nil && t.LeaseEndDate.Before(t.LeaseStartDate) {
		return errors.New("lease_end_date must be after lease_start_date")
	}

	if t.Version < 1 {
		return errors.New("version must be >= 1")
	}

	return nil
}

func (t Tenancy) IsActive() bool {
	return t.Status == TenancyActive
}

func (t Tenancy) IsInvited() bool {
	return t.Status == TenancyInvited
}
