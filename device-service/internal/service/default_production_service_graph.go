package service

func NewDefaultDeviceProductionServiceGraph() *DeviceProductionServiceGraph {
	dependencies := NewDefaultDeviceServiceDependencies(
		DeviceServiceConfig{
			HTTPPort: "8080",
			DeviceID: "",
		},
	)

	core := NewDefaultDeviceServiceCoreIntegrations()

	integration := NewDeviceServiceIntegrationRuntime(
		NewDatabaseIntegration(core.Store),
		NewMessageBusIntegration(core.MessageBus),
		NewDeviceTransportIntegration(core.DeviceTransport),
		NewRepositoryIntegration(
			core.Repository,
			core.EventRepository,
		),
	)

	application := NewDeviceServiceCoreApplication(
		NewDeviceServiceCoreRuntime(core),
	)

	return NewDeviceProductionServiceGraph(
		dependencies,
		core,
		integration,
		application,
	)
}
