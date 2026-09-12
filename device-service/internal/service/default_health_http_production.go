package service

func NewDefaultDeviceHealthHTTPProduction(
	runtimeHealth *DeviceRuntimeHealth,
) *DeviceHealthHTTPProductionBootstrap {
	healthComposition := NewDeviceHealthHTTPComposition(
		runtimeHealth,
	)

	config := NewEnvironmentHTTPServerConfig()

	server := NewDeviceNetHTTPServerFromHealth(
		config,
		healthComposition,
	)

	productionServer := NewDeviceHealthHTTPProductionServer(
		server,
	)

	lifecycle := NewDeviceHealthHTTPProductionLifecycle(
		productionServer,
	)

	return NewDeviceHealthHTTPProductionBootstrap(
		lifecycle,
	)
}
