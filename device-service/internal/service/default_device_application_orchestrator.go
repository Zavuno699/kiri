package service

func NewDefaultDeviceApplicationOrchestrator(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceApplicationOrchestrator {
	return NewDeviceApplicationOrchestrator(
		NewDefaultDeviceApplicationController(integrations),
	)
}
