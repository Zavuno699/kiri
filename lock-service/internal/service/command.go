package service

import (
	"errors"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/lock-service/internal/model"
)

type LockCommand struct {
	CommandID     uuid.UUID
	LockID        uuid.UUID
	LeaseID       uuid.UUID
	Type          model.LockCommandType
	CorrelationID string
	CausationID   string
	RequestedAt   time.Time
}

func (c LockCommand) Validate() error {
	if c.CommandID == uuid.Nil {
		return errors.New("command ID is required")
	}
	if c.LockID == uuid.Nil {
		return errors.New("lock ID is required")
	}
	if c.LeaseID == uuid.Nil {
		return errors.New("lease ID is required")
	}
	if err := c.Type.Validate(); err != nil {
		return err
	}
	if c.CorrelationID == "" {
		return errors.New("correlation ID is required")
	}
	if c.RequestedAt.IsZero() {
		return errors.New("requested_at is required")
	}

	return nil
}

type LockCommandResult struct {
	CommandID   uuid.UUID
	LockID      uuid.UUID
	LeaseID     uuid.UUID
	Type        model.LockCommandType
	Accepted    bool
	Reason      string
	CompletedAt time.Time
}

func (r LockCommandResult) Validate() error {
	if r.CommandID == uuid.Nil {
		return errors.New("command ID is required")
	}
	if r.LockID == uuid.Nil {
		return errors.New("lock ID is required")
	}
	if r.LeaseID == uuid.Nil {
		return errors.New("lease ID is required")
	}
	if err := r.Type.Validate(); err != nil {
		return err
	}
	if r.CompletedAt.IsZero() {
		return errors.New("completed_at is required")
	}
	if !r.Accepted && r.Reason == "" {
		return errors.New("rejected command reason is required")
	}

	return nil
}
