package service

func NewDefaultDeviceApplicationV1Composition(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceApplicationV1Composition {
	return NewDeviceApplicationV1Composition(
		NewDefaultDeviceApplicationAPIServices(
			integrations,
		),
	)
}
