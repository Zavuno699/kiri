package service

func (c *ProductionComponents) IntegrationsRuntime() *DeviceServiceIntegrationRuntime {
	return NewDeviceServiceIntegrationRuntime(
		NewDatabaseIntegration(c.Integrations.Store),
		NewMessageBusIntegration(c.Integrations.MessageBus),
		NewDeviceTransportIntegration(c.Integrations.DeviceTransport),
		NewRepositoryIntegration(
			c.Integrations.Repository,
			c.Integrations.EventRepository,
		),
	)
}
