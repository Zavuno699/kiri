package service

import "os"

func NewEnvironmentAPIServerConfig() DeviceAPIServerConfig {
	address := os.Getenv("DEVICE_SERVICE_HTTP_ADDRESS")
	port := os.Getenv("DEVICE_SERVICE_HTTP_PORT")

	if address == "" {
		address = "0.0.0.0"
	}

	if port == "" {
		port = "8080"
	}

	return NewDeviceAPIServerConfig(
		address + ":" + port,
	)
}
