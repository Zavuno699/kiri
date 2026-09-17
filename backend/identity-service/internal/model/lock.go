package model

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type LockState string

const (
	LockStateActive LockState = "ACTIVE"
	LockStateLocked LockState = "LOCKED"
	LockStateFrozen LockState = "FROZEN"
)

func (s LockState) Validate() error {
	switch s {
	case LockStateActive, LockStateLocked, LockStateFrozen:
		return nil
	default:
		return errors.New("invalid lock state")
	}
}

type Lock struct {
	ID        uuid.UUID
	LeaseID   uuid.UUID
	DeviceID  uuid.UUID
	State     LockState
	CreatedAt time.Time
	UpdatedAt time.Time
	Version   int
}

func (l Lock) Validate() error {
	if l.ID == uuid.Nil {
		return errors.New("id is required")
	}
	if l.LeaseID == uuid.Nil {
		return errors.New("lease_id is required")
	}
	if l.DeviceID == uuid.Nil {
		return errors.New("device_id is required")
	}

	if err := l.State.Validate(); err != nil {
		return err
	}

	if l.CreatedAt.IsZero() {
		return errors.New("created_at is required")
	}

	if l.Version < 1 {
		return errors.New("version must be >= 1")
	}

	return nil
}
