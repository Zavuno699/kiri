package service

type DeviceProductionComponentFactory struct{}

func NewProductionComponentFactory() *DeviceProductionComponentFactory {
	return &DeviceProductionComponentFactory{}
}

func (f *DeviceProductionComponentFactory) Dependencies(
	config ProductionRuntimeConfig,
) *DeviceServiceDependencies {
	return NewDefaultDeviceServiceDependencies(
		DeviceServiceConfig{
			HTTPPort: config.HTTPAddress,
			DeviceID: config.DeviceID,
		},
	)
}

func (f *DeviceProductionComponentFactory) Integrations(
	_ ProductionRuntimeConfig,
) *DeviceServiceCoreIntegrations {
	return NewDefaultDeviceServiceCoreIntegrations()
}

func (f *DeviceProductionComponentFactory) Worker(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceWorkerApplication {
	return NewDefaultDeviceWorkerApplication(
		integrations,
	)
}

func (f *DeviceProductionComponentFactory) API(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceAPIProductionGraph {
	return NewDefaultDeviceAPIProductionGraph(
		integrations,
	)
}
