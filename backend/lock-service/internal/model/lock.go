package model

import (
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"
)

type LockState string

const (
	LockActive LockState = "ACTIVE"
	LockLocked LockState = "LOCKED"
	LockFrozen LockState = "FROZEN"
)

type LockCommandType string

const (
	CommandLock   LockCommandType = "LOCK"
	CommandUnlock LockCommandType = "UNLOCK"
	CommandFreeze LockCommandType = "FREEZE"
)

type Lock struct {
	ID        uuid.UUID
	LeaseID   uuid.UUID
	DeviceID  uuid.UUID
	State     LockState
	CreatedAt time.Time
	UpdatedAt time.Time
	Version   int64
}

func (l Lock) Validate() error {
	if l.ID == uuid.Nil {
		return errors.New("lock ID is required")
	}
	if l.LeaseID == uuid.Nil {
		return errors.New("lease ID is required")
	}
	if l.DeviceID == uuid.Nil {
		return errors.New("device ID is required")
	}

	switch l.State {
	case LockActive, LockLocked, LockFrozen:
	default:
		return errors.New("invalid lock state")
	}

	if l.CreatedAt.IsZero() {
		return errors.New("created_at is required")
	}
	if l.UpdatedAt.IsZero() {
		return errors.New("updated_at is required")
	}
	if l.Version < 1 {
		return errors.New("lock version must be positive")
	}

	return nil
}

func NormalizeLockState(state LockState) LockState {
	return LockState(strings.ToUpper(strings.TrimSpace(string(state))))
}

func (c LockCommandType) Validate() error {
	switch c {
	case CommandLock, CommandUnlock, CommandFreeze:
		return nil
	default:
		return errors.New("invalid lock command")
	}
}
