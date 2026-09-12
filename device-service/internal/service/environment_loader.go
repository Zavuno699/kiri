package service

import "os"

type DeviceEnvironmentLoader struct{}

func NewDeviceEnvironmentLoader() *DeviceEnvironmentLoader {
	return &DeviceEnvironmentLoader{}
}

func (l *DeviceEnvironmentLoader) Load() DeviceServiceConfig {
	return DeviceServiceConfig{
		HTTPPort: os.Getenv("DEVICE_SERVICE_HTTP_PORT"),
		DeviceID: os.Getenv("DEVICE_SERVICE_ID"),
	}
}
