package service

func NewConfiguredDeviceProductionComposition() *DeviceProductionComposition {
	configRuntime := NewDeviceServiceConfigurationRuntime(
		NewEnvironmentConfigProvider(),
	)

	return NewDefaultDeviceProductionComposition(
		configRuntime.Config(),
	)
}
