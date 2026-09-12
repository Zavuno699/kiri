package service

import "time"

func NewDefaultDeviceProductionSignalApplication() *DeviceProductionSignalApplication {
	application := NewDefaultDeviceProductionApplication()

	settings := NewEnvironmentProductionSettings()

	shutdown := NewDeviceGracefulShutdown(
		time.Duration(settings.ShutdownGraceSeconds) * time.Second,
	)

	return NewDeviceProductionSignalApplication(
		application,
		shutdown,
	)
}
