package service

func NewDefaultDeviceProductionServiceOwner() *DeviceProductionServiceOwner {
	return NewDeviceProductionServiceOwner(
		NewDeviceProductionServiceLifecycle(
			NewDefaultDeviceProductionServiceGraph(),
		),
	)
}
