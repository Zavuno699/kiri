package device

import "context"

type RuntimeCommandService struct {
	Executor *CommandExecutor
	Events   *RuntimeEvents
}

func NewRuntimeCommandService(
	executor *CommandExecutor,
	events *RuntimeEvents,
) *RuntimeCommandService {
	return &RuntimeCommandService{
		Executor: executor,
		Events:   events,
	}
}

func (s *RuntimeCommandService) Execute(
	ctx context.Context,
	command string,
	payload []byte,
) (CommandResult, error) {
	result, err := s.Executor.Execute(
		ctx,
		command,
		payload,
	)

	if err != nil {
		return result, err
	}

	return result, nil
}
