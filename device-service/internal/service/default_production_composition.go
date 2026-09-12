package service

func NewDefaultDeviceProductionComposition(
	config DeviceServiceConfig,
) *DeviceProductionComposition {

	dependencies := NewDefaultDeviceServiceDependencies(
		config,
	)

	runtime := NewDeviceProductionRuntime(
		dependencies,
	)

	return NewDeviceProductionComposition(
		runtime,
	)
}
