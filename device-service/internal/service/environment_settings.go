package service

import (
	"os"
	"strconv"
)

func NewEnvironmentProductionSettings() *DeviceProductionSettings {
	config := DeviceServiceConfig{
		HTTPPort: os.Getenv("DEVICE_SERVICE_HTTP_PORT"),
		DeviceID: os.Getenv("DEVICE_SERVICE_ID"),
	}

	httpConfig := NewEnvironmentHTTPServerConfig()

	grace := 30

	if value := os.Getenv("DEVICE_SERVICE_SHUTDOWN_GRACE_SECONDS"); value != "" {
		if parsed, err := strconv.Atoi(value); err == nil && parsed > 0 {
			grace = parsed
		}
	}

	return &DeviceProductionSettings{
		Config:               config,
		HTTP:                 httpConfig,
		ShutdownGraceSeconds: grace,
	}
}
