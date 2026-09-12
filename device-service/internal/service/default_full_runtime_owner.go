package service

func NewDefaultDeviceServiceFullRuntimeOwner(
	config DeviceServiceConfig,
) *DeviceServiceFullRuntimeOwner {
	return NewDeviceServiceFullRuntimeOwner(
		NewDefaultDeviceServiceFullRuntimeBootstrap(config),
	)
}
