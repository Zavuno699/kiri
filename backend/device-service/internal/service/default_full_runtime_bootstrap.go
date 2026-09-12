package service

func NewDefaultDeviceServiceFullRuntimeBootstrap(
	config DeviceServiceConfig,
) *DeviceServiceFullRuntimeBootstrap {
	return NewDeviceServiceFullRuntimeBootstrap(
		NewDefaultDeviceServiceFullCoreComposition(config),
	)
}
