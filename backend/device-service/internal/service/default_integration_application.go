package service

func NewDefaultDeviceIntegrationApplication(
	dependencies *DeviceServiceDependencies,
) *DeviceIntegrationApplication {
	return NewDeviceIntegrationApplication(
		NewDefaultDeviceIntegrationGraph(dependencies),
	)
}
