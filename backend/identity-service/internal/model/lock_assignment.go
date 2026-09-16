package model

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type LockAssignmentStatus string

const (
	LockAssignmentActive   LockAssignmentStatus = "ACTIVE"
	LockAssignmentInactive LockAssignmentStatus = "INACTIVE"
	LockAssignmentReplaced LockAssignmentStatus = "REPLACED"
)

func (s LockAssignmentStatus) Validate() error {
	switch s {
	case LockAssignmentActive, LockAssignmentInactive, LockAssignmentReplaced:
		return nil
	default:
		return errors.New("invalid lock assignment status")
	}
}

type LockAssignment struct {
	ID            uuid.UUID
	LockID        uuid.UUID
	UnitID        uuid.UUID
	Status        LockAssignmentStatus
	AssignedAt    time.Time
	DeactivatedAt *time.Time
	Notes         string
	CreatedAt     time.Time
	UpdatedAt     time.Time
	Version       int
}

func (a LockAssignment) Validate() error {
	if a.ID == uuid.Nil {
		return errors.New("id is required")
	}
	if a.LockID == uuid.Nil {
		return errors.New("lock_id is required")
	}
	if a.UnitID == uuid.Nil {
		return errors.New("unit_id is required")
	}

	if err := a.Status.Validate(); err != nil {
		return err
	}

	if a.AssignedAt.IsZero() {
		return errors.New("assigned_at is required")
	}

	if a.Version < 1 {
		return errors.New("version must be >= 1")
	}

	return nil
}

func (a LockAssignment) IsActive() bool {
	return a.Status == LockAssignmentActive
}
