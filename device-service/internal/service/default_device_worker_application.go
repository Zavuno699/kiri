package service

func NewDefaultDeviceWorkerApplication(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceWorkerApplication {
	return NewDeviceWorkerApplication(
		NewDeviceWorkerLifecycle(
			NewDefaultDeviceWorkerRuntime(integrations),
		),
	)
}
