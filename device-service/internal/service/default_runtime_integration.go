package service

func NewDefaultDeviceServiceRuntimeIntegration(
	dependencies *DeviceServiceDependencies,
) *DeviceServiceRuntimeIntegration {

	runtime := NewDeviceProductionRuntime(
		dependencies,
	)

	observability := NewDefaultDeviceServiceObservabilityComposition(
		dependencies,
	)

	return NewDeviceServiceRuntimeIntegration(
		runtime,
		observability,
	)
}
