package service

func NewDefaultDeviceProductionDependencyGraph(
	dependencies *DeviceServiceDependencies,
) *DeviceProductionDependencyGraph {
	factory := NewDeviceInfrastructureFactory()

	configuration := factory.BuildConfiguration()

	core := NewDefaultDeviceServiceCoreIntegrations()

	infrastructureDependencies := NewDeviceInfrastructureDependencies(
		configuration,
		core,
	)

	integration := NewDeviceServiceIntegrationRuntime(
		NewDatabaseIntegration(core.Store),
		NewMessageBusIntegration(core.MessageBus),
		NewDeviceTransportIntegration(core.DeviceTransport),
		NewRepositoryIntegration(
			core.Repository,
			core.EventRepository,
		),
	)

	infrastructure := NewDeviceInfrastructureRuntime(
		infrastructureDependencies,
		integration,
	)

	owner := NewDeviceInfrastructureOwner(
		infrastructure,
	)

	return NewDeviceProductionDependencyGraph(
		factory,
		infrastructureDependencies,
		infrastructure,
		owner,
	)
}
