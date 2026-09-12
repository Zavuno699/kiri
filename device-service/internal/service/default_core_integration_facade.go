package service

func NewDefaultDeviceServiceCoreIntegrationFacade() *DeviceServiceCoreIntegrationFacade {
	return NewDeviceServiceCoreIntegrationFacade(
		NewDefaultDeviceServiceCoreOwner(),
	)
}
