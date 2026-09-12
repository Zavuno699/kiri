package service

func NewDefaultDeviceServiceRuntimeOrchestration(
	config DeviceServiceConfig,
) *DeviceServiceRuntimeOrchestration {

	dependencies := NewDefaultDeviceServiceDependencies(
		config,
	)

	integration := NewDefaultDeviceServiceRuntimeIntegration(
		dependencies,
	)

	return NewDeviceServiceRuntimeOrchestration(
		integration,
	)
}
