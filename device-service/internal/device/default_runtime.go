package device

func NewDefaultRuntime(
	config Config,
) *Runtime {
	return NewRuntime(
		NewDefaultClient(config),
	)
}
