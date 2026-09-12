package service

func NewDefaultDeviceStateStack(
	integrations *DeviceServiceCoreIntegrations,
) (
	*DeviceStateMachine,
	*DeviceStateService,
	*DeviceEventService,
) {
	machine := NewDeviceStateMachine()

	state := NewDeviceStateService(
		integrations.Repository,
		machine,
	)

	events := NewDeviceEventService(
		*NewMessageBusIntegration(
			integrations.MessageBus,
		),
		integrations.EventRepository,
	)

	return machine, state, events
}
