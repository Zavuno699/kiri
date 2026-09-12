package service

func NewDefaultDeviceProductionProcessRuntime(
	config DeviceServiceConfig,
) *DeviceProductionProcessRuntime {
	orchestrator := NewDefaultDeviceProductionRuntimeOrchestrator(
		config,
	)

	return NewDeviceProductionProcessRuntime(
		orchestrator,
	)
}
