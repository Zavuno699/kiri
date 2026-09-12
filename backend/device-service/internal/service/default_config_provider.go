package service

type DefaultDeviceServiceConfigProvider struct {
	config DeviceServiceConfig
}

func NewDefaultDeviceServiceConfigProvider(
	config DeviceServiceConfig,
) *DefaultDeviceServiceConfigProvider {
	return &DefaultDeviceServiceConfigProvider{
		config: config,
	}
}

func (p *DefaultDeviceServiceConfigProvider) Config() DeviceServiceConfig {
	return p.config
}
