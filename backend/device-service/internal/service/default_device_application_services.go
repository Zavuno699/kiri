package service

func NewDefaultDeviceApplicationServices(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceApplicationServices {
	query := NewDeviceQueryService(
		integrations.Repository,
	)

	commands := NewDeviceCommandApplicationService(
		integrations.DeviceTransport,
		integrations.EventRepository,
	)

	registration := NewDeviceRegistrationService(
		integrations.Repository,
	)

	status := NewDeviceStatusService(
		integrations.Repository,
	)

	messageBus := NewMessageBusIntegration(
		integrations.MessageBus,
	)

	events := NewDeviceEventService(
		*messageBus,
		integrations.EventRepository,
	)

	health := NewDeviceApplicationHealthService(
		integrations.Repository,
	)

	return NewDeviceApplicationServices(
		query,
		commands,
		registration,
		status,
		events,
		health,
	)
}
