package service

import (
	"context"
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/lock-service/internal/model"
	"github.com/kirilock/backend/lock-service/internal/repository"
)

type LockApplication struct {
	repository repository.LockRepository
}

func NewLockApplication(
	repo repository.LockRepository,
) (*LockApplication, error) {
	if repo == nil {
		return nil, errors.New("lock repository is required")
	}

	return &LockApplication{repository: repo}, nil
}

func (a *LockApplication) ExecuteCommand(
	ctx context.Context,
	command LockCommand,
	now time.Time,
) (LockCommandResult, error) {
	if a == nil {
		return LockCommandResult{}, errors.New("lock application is required")
	}
	if ctx == nil {
		return LockCommandResult{}, errors.New("context is required")
	}
	if err := command.Validate(); err != nil {
		return LockCommandResult{}, err
	}
	if now.IsZero() {
		return LockCommandResult{}, errors.New("command execution time is required")
	}

	lock, err := a.repository.GetByID(ctx, command.LockID)
	if err != nil {
		return LockCommandResult{}, err
	}

	if lock.LeaseID != command.LeaseID {
		return LockCommandResult{}, errors.New(
			"command lease does not match lock lease",
		)
	}

	if err := ValidateCommandAgainstState(lock.State, command.Type); err != nil {
		return LockCommandResult{
			CommandID:   command.CommandID,
			LockID:      command.LockID,
			LeaseID:     command.LeaseID,
			Type:        command.Type,
			Accepted:    false,
			Reason:      err.Error(),
			CompletedAt: now.UTC(),
		}, nil
	}

	targetState := targetStateForCommand(command.Type)

	if err := a.repository.UpdateState(
		ctx,
		lock.ID,
		lock.Version,
		targetState,
		now.UTC(),
	); err != nil {
		return LockCommandResult{}, err
	}

	return LockCommandResult{
		CommandID:   command.CommandID,
		LockID:      command.LockID,
		LeaseID:     command.LeaseID,
		Type:        command.Type,
		Accepted:    true,
		CompletedAt: now.UTC(),
	}, nil
}

func targetStateForCommand(
	command model.LockCommandType,
) model.LockState {
	switch command {
	case model.CommandLock:
		return model.LockLocked
	case model.CommandUnlock:
		return model.LockActive
	case model.CommandFreeze:
		return model.LockFrozen
	default:
		return ""
	}
}

func NewLockCommand(
	lockID uuid.UUID,
	leaseID uuid.UUID,
	commandType model.LockCommandType,
	correlationID string,
	causationID string,
	now time.Time,
) (LockCommand, error) {
	command := LockCommand{
		CommandID:     uuid.New(),
		LockID:        lockID,
		LeaseID:       leaseID,
		Type:          commandType,
		CorrelationID: strings.TrimSpace(correlationID),
		CausationID:   strings.TrimSpace(causationID),
		RequestedAt:   now.UTC(),
	}

	if err := command.Validate(); err != nil {
		return LockCommand{}, err
	}

	return command, nil
}
