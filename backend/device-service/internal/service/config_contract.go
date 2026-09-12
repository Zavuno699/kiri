package service

type DeviceServiceConfig struct {
	HTTPPort string
	DeviceID string
}

type DeviceServiceConfigProvider interface {
	Config() DeviceServiceConfig
}
