package service

import "os"

type EnvironmentConfigProvider struct{}

func NewEnvironmentConfigProvider() *EnvironmentConfigProvider {
	return &EnvironmentConfigProvider{}
}

func (p *EnvironmentConfigProvider) Config() DeviceServiceConfig {
	return DeviceServiceConfig{
		HTTPPort: os.Getenv("DEVICE_SERVICE_HTTP_PORT"),
		DeviceID: os.Getenv("DEVICE_SERVICE_ID"),
	}
}
