package service

func NewDefaultDeviceProductionProcess(
	config DeviceServiceConfig,
) *DeviceProductionProcess {
	runtime := NewDefaultDeviceProductionProcessRuntime(
		config,
	)

	return NewDeviceProductionProcess(
		runtime,
	)
}
