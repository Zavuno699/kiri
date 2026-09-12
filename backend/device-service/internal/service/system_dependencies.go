package service

type DeviceSystemDependencies struct {
	Service      *DeviceServiceDependencies
	Integrations *DeviceServiceCoreIntegrations
	Worker       *DeviceWorkerApplication
}

func NewDeviceSystemDependencies(
	service *DeviceServiceDependencies,
	integrations *DeviceServiceCoreIntegrations,
	worker *DeviceWorkerApplication,
) *DeviceSystemDependencies {
	return &DeviceSystemDependencies{
		Service:      service,
		Integrations: integrations,
		Worker:       worker,
	}
}
