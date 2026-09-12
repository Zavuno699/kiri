package service

func NewDefaultDeviceCommandWorkerRoutes(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceCommandWorkerRoutes {
	runtime := NewDefaultDeviceCommandWorkerRuntime(
		integrations,
	)

	return NewDeviceCommandWorkerRoutes(
		NewDeviceCommandRequestHandler(runtime),
	)
}
