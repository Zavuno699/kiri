package service

func NewDefaultDeviceServiceRuntimeEntry(
	config DeviceServiceConfig,
) *DeviceServiceRuntimeEntry {

	orchestration := NewDefaultDeviceServiceRuntimeOrchestration(
		config,
	)

	return NewDeviceServiceRuntimeEntry(
		orchestration,
	)
}
