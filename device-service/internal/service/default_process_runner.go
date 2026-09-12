package service

func NewDefaultDeviceProcessRunner(
	config DeviceServiceConfig,
) *DeviceProcessRunner {
	return NewDeviceProcessRunner(
		NewDefaultDeviceProductionProcess(config),
	)
}
