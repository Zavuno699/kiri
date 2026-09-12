package service

type DeviceServiceConfigurationRuntime struct {
	Provider DeviceServiceConfigProvider
}

func NewDeviceServiceConfigurationRuntime(
	provider DeviceServiceConfigProvider,
) *DeviceServiceConfigurationRuntime {
	return &DeviceServiceConfigurationRuntime{
		Provider: provider,
	}
}

func (r *DeviceServiceConfigurationRuntime) Config() DeviceServiceConfig {
	return r.Provider.Config()
}
