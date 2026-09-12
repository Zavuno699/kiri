package service

type DeviceProductionSettings struct {
	Config               DeviceServiceConfig
	HTTP                 DeviceHTTPServerConfig
	ShutdownGraceSeconds int
}

func NewDeviceProductionSettings(
	config DeviceServiceConfig,
	http DeviceHTTPServerConfig,
) *DeviceProductionSettings {
	return &DeviceProductionSettings{
		Config: config,
		HTTP:   http,
	}
}
