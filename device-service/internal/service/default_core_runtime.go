package service

func NewDefaultDeviceServiceCoreRuntime() *DeviceServiceCoreRuntime {
	return NewDeviceServiceCoreRuntime(
		NewDefaultDeviceServiceCoreIntegrations(),
	)
}
