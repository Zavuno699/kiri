package model

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type LockCommandStatus string

const (
	LockCommandRequested    LockCommandStatus = "REQUESTED"
	LockCommandAuthorized   LockCommandStatus = "AUTHORIZED"
	LockCommandDenied       LockCommandStatus = "DENIED"
	LockCommandDispatched   LockCommandStatus = "DISPATCHED"
	LockCommandAcknowledged LockCommandStatus = "ACKNOWLEDGED"
	LockCommandExecuted     LockCommandStatus = "EXECUTED"
	LockCommandFailed       LockCommandStatus = "FAILED"
	LockCommandExpired      LockCommandStatus = "EXPIRED"
	LockCommandTimeout      LockCommandStatus = "TIMEOUT"
	LockCommandCancelled    LockCommandStatus = "CANCELLED"
)

type LockCommand struct {
	ID                   uuid.UUID
	LockID               uuid.UUID
	Operation            string
	Status               LockCommandStatus
	TenantSubjectID      *uuid.UUID
	TenancyID            *uuid.UUID
	UnitID               *uuid.UUID
	AuthorizationReason  string
	IdempotencyKey       string
	DispatchedAt         *time.Time
	DeviceAcknowledgedAt *time.Time
	ExecutedAt           *time.Time
	FailureReason        string
	CancelledBy          *uuid.UUID
	CancelledAt          *time.Time
	CorrelationID        *uuid.UUID
	CreatedAt            time.Time
	UpdatedAt            time.Time
	Version              int
}

func (c LockCommand) Validate() error {
	if c.ID == uuid.Nil {
		return errors.New("id is required")
	}

	if c.LockID == uuid.Nil {
		return errors.New("lock_id is required")
	}

	if c.Operation == "" {
		return errors.New("operation is required")
	}

	switch c.Operation {
	case "lock", "unlock":
		// Valid
	default:
		return errors.New("operation must be 'lock' or 'unlock'")
	}

	switch c.Status {
	case LockCommandRequested, LockCommandAuthorized, LockCommandDenied, LockCommandDispatched,
		LockCommandAcknowledged, LockCommandExecuted, LockCommandFailed, LockCommandExpired,
		LockCommandTimeout, LockCommandCancelled:
		// Valid
	default:
		return errors.New("invalid lock command status")
	}

	if c.IdempotencyKey == "" {
		return errors.New("idempotency_key is required")
	}

	if c.Version < 1 {
		return errors.New("version must be >= 1")
	}

	return nil
}

func (c LockCommand) CanTransitionTo(newStatus LockCommandStatus) bool {
	switch c.Status {
	case LockCommandRequested:
		return newStatus == LockCommandAuthorized || newStatus == LockCommandDenied ||
			newStatus == LockCommandCancelled || newStatus == LockCommandExpired
	case LockCommandAuthorized:
		return newStatus == LockCommandDispatched || newStatus == LockCommandCancelled ||
			newStatus == LockCommandExpired || newStatus == LockCommandTimeout
	case LockCommandDispatched:
		return newStatus == LockCommandAcknowledged || newStatus == LockCommandExecuted ||
			newStatus == LockCommandFailed || newStatus == LockCommandTimeout || newStatus == LockCommandCancelled
	case LockCommandAcknowledged:
		return newStatus == LockCommandExecuted || newStatus == LockCommandFailed || newStatus == LockCommandCancelled
	default:
		return false // Terminal states cannot transition
	}
}

func (c LockCommand) IsTerminal() bool {
	switch c.Status {
	case LockCommandDenied, LockCommandExecuted, LockCommandFailed, LockCommandExpired,
		LockCommandTimeout, LockCommandCancelled:
		return true
	default:
		return false
	}
}
