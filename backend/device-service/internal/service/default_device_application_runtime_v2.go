package service

func NewDefaultDeviceApplicationRuntimeV2(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceApplicationRuntimeV2 {
	api := NewDefaultDeviceAPIComposition(
		integrations,
	)

	return NewDeviceApplicationRuntimeV2(
		api,
		api.Services,
	)
}
