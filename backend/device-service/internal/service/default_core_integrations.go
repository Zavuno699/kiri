package service

func NewDefaultDeviceServiceCoreIntegrations() *DeviceServiceCoreIntegrations {
	return NewDeviceServiceCoreIntegrations(
		NewNoopDeviceServiceStore(),
		NewNoopDeviceServiceMessageBus(),
		NewNoopDeviceServiceDeviceTransport(),
		NewNoopDeviceServiceRepository(),
		NewNoopDeviceServiceEventRepository(),
	)
}
