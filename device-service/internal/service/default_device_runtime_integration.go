package service

import "github.com/kirilock/backend/device-service/internal/device"

func NewDefaultDeviceRuntimeIntegration(
	config DeviceServiceConfig,
) *DeviceRuntimeIntegration {
	deviceConfig := device.NewConfig(
		"",
		config.DeviceID,
		0,
	)

	return NewDeviceRuntimeIntegration(
		device.NewDefaultController(deviceConfig),
		deviceConfig,
	)
}
