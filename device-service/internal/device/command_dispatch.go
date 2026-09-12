package device

import "context"

type CommandDispatcher struct {
	Controller *Controller
}

func NewCommandDispatcher(
	controller *Controller,
) *CommandDispatcher {
	return &CommandDispatcher{
		Controller: controller,
	}
}

func (d *CommandDispatcher) Dispatch(
	ctx context.Context,
	command string,
	payload []byte,
) ([]byte, error) {
	return d.Controller.Execute(
		ctx,
		command,
		payload,
	)
}
