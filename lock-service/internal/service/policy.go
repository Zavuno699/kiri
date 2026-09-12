package service

import (
	"errors"

	"github.com/kirilock/backend/lock-service/internal/model"
)

func CanExecuteCommand(
	state model.LockState,
	command model.LockCommandType,
) bool {
	state = model.NormalizeLockState(state)

	switch state {
	case model.LockActive:
		return command == model.CommandLock ||
			command == model.CommandFreeze

	case model.LockLocked:
		return command == model.CommandUnlock ||
			command == model.CommandFreeze

	case model.LockFrozen:
		return command == model.CommandFreeze

	default:
		return false
	}
}

func ValidateCommandAgainstState(
	state model.LockState,
	command model.LockCommandType,
) error {
	if !CanExecuteCommand(state, command) {
		return errors.New("lock command is not permitted in current state")
	}

	return nil
}
