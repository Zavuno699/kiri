package service

func NewDefaultDeviceProcessSignalRuntime(
	config DeviceServiceConfig,
) *DeviceProcessSignalRuntime {
	return NewDeviceProcessSignalRuntime(
		NewDefaultDeviceProductionProcess(config),
	)
}
