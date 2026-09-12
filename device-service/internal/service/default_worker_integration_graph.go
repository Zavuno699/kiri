package service

func NewDefaultDeviceWorkerIntegrationGraph(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceWorkerIntegrationGraph {
	return NewDeviceWorkerIntegrationGraph(
		NewDefaultDeviceWorkerService(integrations),
		NewMessageBusRuntime(
			NewMessageBusIntegration(
				integrations.MessageBus,
			),
		),
		NewDefaultDeviceServiceIntegrationRuntime(
			NewDeviceServiceDependencies(
				NewDefaultDeviceServiceConfigProvider(
					DeviceServiceConfig{},
				),
				NewDefaultDeviceServiceLogger(),
				NewDefaultDeviceServiceMetrics(),
			),
		),
	)
}
