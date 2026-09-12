package service

func NewDefaultDeviceOperationalComposition(
	config DeviceServiceConfig,
) *DeviceOperationalComposition {

	process := NewDefaultDeviceServiceRuntimeProcess(
		config,
	)

	state := NewDeviceRuntimeState()

	startup := NewDeviceStartupCoordinator(
		process,
		state,
	)

	shutdown := NewDeviceShutdownCoordinator(
		process,
	)

	runtime := NewDeviceOperationalRuntime(
		state,
		startup,
		shutdown,
	)

	return NewDeviceOperationalComposition(
		runtime,
	)
}
