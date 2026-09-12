package device

func NewDefaultCommandDispatcher(
	config Config,
) *CommandDispatcher {
	return NewCommandDispatcher(
		NewDefaultController(config),
	)
}
