package service

type DeviceInfrastructureDependencies struct {
	Configuration *DeviceIntegrationConfig
	Core          *DeviceServiceCoreIntegrations
}

func NewDeviceInfrastructureDependencies(
	configuration *DeviceIntegrationConfig,
	core *DeviceServiceCoreIntegrations,
) *DeviceInfrastructureDependencies {
	return &DeviceInfrastructureDependencies{
		Configuration: configuration,
		Core:          core,
	}
}
