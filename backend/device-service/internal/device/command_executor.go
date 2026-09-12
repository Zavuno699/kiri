package device

import "context"

type CommandExecutor struct {
	Runtime *DeviceRuntimeService
	State   *State
}

func NewCommandExecutor(
	runtime *DeviceRuntimeService,
	state *State,
) *CommandExecutor {
	return &CommandExecutor{
		Runtime: runtime,
		State:   state,
	}
}

func (e *CommandExecutor) Execute(
	ctx context.Context,
	command string,
	payload []byte,
) (CommandResult, error) {
	response, err := e.Runtime.Execute(
		ctx,
		command,
		payload,
	)

	if err != nil {
		e.State.SetStatus("failed")

		return CommandResult{
			Command: command,
			Status:  "failed",
		}, err
	}

	e.State.SetStatus("ready")

	return CommandResult{
		Command: command,
		Payload: response.Payload,
		Status:  "ok",
	}, nil
}
