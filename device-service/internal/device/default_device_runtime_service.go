package device

func NewDefaultDeviceRuntimeService(
	config Config,
) *DeviceRuntimeService {
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

	health := NewHealth(
		state,
	)

	return NewDeviceRuntimeService(
		service,
		state,
		health,
	)
}
