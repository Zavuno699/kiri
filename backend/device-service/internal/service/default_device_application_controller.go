package service

func NewDefaultDeviceApplicationController(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceApplicationController {
	return NewDeviceApplicationController(
		NewDefaultDeviceApplicationRuntime(integrations),
	)
}
