package service

func NewDefaultDeviceProductionApplication() *DeviceProductionApplication {
	return NewDeviceProductionApplication(
		NewDefaultDeviceProductionBootstrapGraph(),
	)
}
