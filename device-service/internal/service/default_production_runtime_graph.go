package service

func NewDefaultDeviceProductionRuntimeGraph(
	config DeviceServiceConfig,
) *DeviceProductionRuntimeGraph {
	runtimeHealth := NewDeviceRuntimeHealth()

	httpService := NewDefaultDeviceProductionHTTPService(
		runtimeHealth,
		config,
	)

	core := NewDefaultDeviceServiceCoreIntegrationFacade()

	return NewDeviceProductionRuntimeGraph(
		runtimeHealth,
		httpService,
		core,
	)
}
