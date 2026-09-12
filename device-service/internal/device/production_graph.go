package device

type ProductionGraph struct {
	Config   Config
	Runtime  *DeviceRuntimeService
	Registry *Registry
	Health   *Health
}

func NewProductionGraph(
	config Config,
) *ProductionGraph {
	registry := NewRegistry()

	manager := NewManager(
		registry,
	)

	service := NewService(
		manager,
		registry,
	)

	state := NewState(
		config.DeviceID,
	)

	health := NewHealth(state)

	runtime := NewDeviceRuntimeService(
		service,
		state,
		health,
	)

	return &ProductionGraph{
		Config:   config,
		Runtime:  runtime,
		Registry: registry,
		Health:   health,
	}
}
