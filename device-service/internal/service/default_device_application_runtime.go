package service

func NewDefaultDeviceApplicationRuntime(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceApplicationRuntime {
	return NewDeviceApplicationRuntime(
		NewDefaultDeviceApplicationServices(integrations),
	)
}
