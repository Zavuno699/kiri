package device

import "context"

type Controller struct {
	Application *Application
	Commands    *CommandService
}

func NewController(
	application *Application,
	commands *CommandService,
) *Controller {
	return &Controller{
		Application: application,
		Commands:    commands,
	}
}

func (c *Controller) Start(
	ctx context.Context,
) error {
	return c.Application.Start(ctx)
}

func (c *Controller) Stop(
	ctx context.Context,
) error {
	return c.Application.Stop(ctx)
}

func (c *Controller) Execute(
	ctx context.Context,
	command string,
	payload []byte,
) ([]byte, error) {
	return c.Commands.Execute(
		ctx,
		command,
		payload,
	)
}
