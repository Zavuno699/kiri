package service

func NewDefaultDeviceServiceIntegrationOwner(
	dependencies *DeviceServiceDependencies,
) *DeviceServiceIntegrationOwner {
	return NewDeviceServiceIntegrationOwner(
		NewDefaultDeviceServiceIntegrationRuntime(dependencies),
	)
}
