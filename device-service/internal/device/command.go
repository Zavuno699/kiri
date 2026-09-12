package device

import (
	"context"
	"errors"
)

type CommandService struct {
	Runtime *DeviceRuntimeService
	State   *State
}

func NewCommandService(
	runtime *DeviceRuntimeService,
	state *State,
) *CommandService {
	return &CommandService{
		Runtime: runtime,
		State:   state,
	}
}

func (s *CommandService) Execute(
	ctx context.Context,
	command string,
	payload []byte,
) ([]byte, error) {
	if command == "" {
		return nil, errors.New("device command is required")
	}

	response, err := s.Runtime.Execute(
		ctx,
		command,
		payload,
	)

	if err != nil {
		s.State.SetStatus("failed")
		return nil, err
	}

	s.State.SetStatus("ready")

	return response.Payload, nil
}
