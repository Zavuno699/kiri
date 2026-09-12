package service

func NewDefaultDeviceProductionHTTPService(
	runtimeHealth *DeviceRuntimeHealth,
	config DeviceServiceConfig,
) *DeviceProductionHTTPService {
	dependencies := NewDeviceProductionHTTPDependencies(
		runtimeHealth,
		config,
	)

	composition := NewDeviceProductionHTTPComposition(
		dependencies,
	)

	return NewDeviceProductionHTTPService(
		composition,
	)
}
