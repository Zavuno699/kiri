package service

func NewDefaultDeviceServiceIntegrationRuntime(
	dependencies *DeviceServiceDependencies,
) *DeviceServiceIntegrationRuntime {

	integrations := NewDefaultDeviceServiceCoreIntegrations()

	return NewDeviceServiceIntegrationRuntime(
		NewDatabaseIntegration(integrations.Store),
		NewMessageBusIntegration(integrations.MessageBus),
		NewDeviceTransportIntegration(integrations.DeviceTransport),
		NewRepositoryIntegration(
			integrations.Repository,
			integrations.EventRepository,
		),
	)
}
