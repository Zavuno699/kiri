package service

func NewDefaultDeviceCommandWorkerRuntime(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceCommandWorkerRuntime {
	return NewDeviceCommandWorkerRuntime(
		NewDefaultDeviceCommandWorker(
			integrations,
		),
	)
}
