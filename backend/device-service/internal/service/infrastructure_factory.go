package service

type DeviceInfrastructureFactory struct{}

func NewDeviceInfrastructureFactory() *DeviceInfrastructureFactory {
	return &DeviceInfrastructureFactory{}
}

func (f *DeviceInfrastructureFactory) BuildConfiguration() *DeviceIntegrationConfig {
	return NewEnvironmentDeviceIntegrationConfig()
}
