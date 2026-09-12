package device

func NewDefaultApplication(
	config Config,
) *Application {
	graph := NewProductionGraph(config)

	return NewApplication(
		graph.Runtime,
		config,
	)
}
