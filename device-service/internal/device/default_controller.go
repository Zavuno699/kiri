package device

func NewDefaultController(
	config Config,
) *Controller {
	application := NewDefaultApplication(config)

	commandService := NewCommandService(
		application.Runtime,
		application.Runtime.State,
	)

	return NewController(
		application,
		commandService,
	)
}
