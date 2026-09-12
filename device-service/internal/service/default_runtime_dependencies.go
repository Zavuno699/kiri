package service

func NewDefaultDeviceServiceDependencies(
	config DeviceServiceConfig,
) *DeviceServiceDependencies {
	return NewDeviceServiceDependencies(
		NewDefaultDeviceServiceConfigProvider(config),
		NewDefaultDeviceServiceLogger(),
		NewDefaultDeviceServiceMetrics(),
	)
}
