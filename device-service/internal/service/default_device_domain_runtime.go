package service

func NewDefaultDeviceDomainRuntime(
	config DeviceServiceConfig,
) *DeviceDomainRuntime {
	integration := NewDefaultDeviceRuntimeIntegration(
		config,
	)

	return NewDeviceDomainRuntime(
		integration,
		NewDeviceRuntimeHealth(),
	)
}
