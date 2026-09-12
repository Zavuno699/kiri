package service

func NewDefaultDeviceWorkerService(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceWorkerService {
	return NewDeviceWorkerService(
		NewDefaultDeviceWorkerApplication(
			integrations,
		),
	)
}
