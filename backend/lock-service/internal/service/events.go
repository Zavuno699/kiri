package service

import (
	"errors"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/lock-service/internal/model"
)

const (
	EventLockCommand       = "lock.command"
	EventLockCommandResult = "lock.command.result"
	EventLockStateChanged  = "lock.state.changed"
)

type LockCommandEvent struct {
	CommandID     uuid.UUID             `json:"command_id"`
	LockID        uuid.UUID             `json:"lock_id"`
	LeaseID       uuid.UUID             `json:"lease_id"`
	Type          model.LockCommandType `json:"type"`
	CorrelationID string                `json:"correlation_id"`
	CausationID   string                `json:"causation_id,omitempty"`
	RequestedAt   time.Time             `json:"requested_at"`
}

func (e LockCommandEvent) Validate() error {
	if e.CommandID == uuid.Nil {
		return errors.New("command ID is required")
	}
	if e.LockID == uuid.Nil {
		return errors.New("lock ID is required")
	}
	if e.LeaseID == uuid.Nil {
		return errors.New("lease ID is required")
	}
	if err := e.Type.Validate(); err != nil {
		return err
	}
	if e.CorrelationID == "" {
		return errors.New("correlation ID is required")
	}
	if e.RequestedAt.IsZero() {
		return errors.New("requested_at is required")
	}

	return nil
}

type LockCommandResultEvent struct {
	CommandID     uuid.UUID             `json:"command_id"`
	LockID        uuid.UUID             `json:"lock_id"`
	LeaseID       uuid.UUID             `json:"lease_id"`
	Type          model.LockCommandType `json:"type"`
	Accepted      bool                  `json:"accepted"`
	Reason        string                `json:"reason,omitempty"`
	CompletedAt   time.Time             `json:"completed_at"`
	CorrelationID string                `json:"correlation_id"`
	CausationID   string                `json:"causation_id,omitempty"`
}

func (e LockCommandResultEvent) Validate() error {
	if e.CommandID == uuid.Nil {
		return errors.New("command ID is required")
	}
	if e.LockID == uuid.Nil {
		return errors.New("lock ID is required")
	}
	if e.LeaseID == uuid.Nil {
		return errors.New("lease ID is required")
	}
	if err := e.Type.Validate(); err != nil {
		return err
	}
	if e.CompletedAt.IsZero() {
		return errors.New("completed_at is required")
	}
	if e.CorrelationID == "" {
		return errors.New("correlation ID is required")
	}
	if !e.Accepted && e.Reason == "" {
		return errors.New("rejected command reason is required")
	}

	return nil
}

type LockStateChangedEvent struct {
	LockID        uuid.UUID       `json:"lock_id"`
	LeaseID       uuid.UUID       `json:"lease_id"`
	DeviceID      uuid.UUID       `json:"device_id"`
	PreviousState model.LockState `json:"previous_state"`
	CurrentState  model.LockState `json:"current_state"`
	ChangedAt     time.Time       `json:"changed_at"`
	CorrelationID string          `json:"correlation_id"`
	CausationID   string          `json:"causation_id,omitempty"`
}

func (e LockStateChangedEvent) Validate() error {
	if e.LockID == uuid.Nil {
		return errors.New("lock ID is required")
	}
	if e.LeaseID == uuid.Nil {
		return errors.New("lease ID is required")
	}
	if e.DeviceID == uuid.Nil {
		return errors.New("device ID is required")
	}

	e.PreviousState = model.NormalizeLockState(e.PreviousState)
	e.CurrentState = model.NormalizeLockState(e.CurrentState)

	if e.PreviousState == "" || e.CurrentState == "" {
		return errors.New("lock states are required")
	}
	if e.PreviousState == e.CurrentState {
		return errors.New("lock state must change")
	}
	if e.ChangedAt.IsZero() {
		return errors.New("changed_at is required")
	}
	if e.CorrelationID == "" {
		return errors.New("correlation ID is required")
	}

	return nil
}
