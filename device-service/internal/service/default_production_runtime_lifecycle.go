package service

func NewDefaultDeviceProductionRuntimeLifecycle(
	config DeviceServiceConfig,
) *DeviceProductionRuntimeLifecycle {
	graph := NewDefaultDeviceProductionRuntimeGraph(
		config,
	)

	return NewDeviceProductionRuntimeLifecycle(
		graph,
	)
}
