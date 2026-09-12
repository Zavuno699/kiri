package service

func NewDefaultDeviceAPIComposition(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceAPIComposition {
	return NewDeviceAPIComposition(
		NewDefaultDeviceApplicationAPIServices(
			integrations,
		),
	)
}
