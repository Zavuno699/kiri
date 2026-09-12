package service

func NewDefaultDeviceProductionDependencyApplication(
	dependencies *DeviceServiceDependencies,
) *DeviceProductionDependencyApplication {
	return NewDeviceProductionDependencyApplication(
		NewDefaultDeviceProductionDependencyGraph(dependencies),
	)
}
