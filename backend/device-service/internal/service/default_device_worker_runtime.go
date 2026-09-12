package service

func NewDefaultDeviceWorkerRuntime(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceWorkerRuntime {
	return NewDeviceWorkerRuntime(
		NewDefaultDeviceWorker(integrations),
	)
}
