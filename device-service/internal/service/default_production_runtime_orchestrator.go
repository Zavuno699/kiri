package service

func NewDefaultDeviceProductionRuntimeOrchestrator(
	config DeviceServiceConfig,
) *DeviceProductionRuntimeOrchestrator {
	lifecycle := NewDefaultDeviceProductionRuntimeLifecycle(
		config,
	)

	return NewDeviceProductionRuntimeOrchestrator(
		lifecycle,
	)
}
