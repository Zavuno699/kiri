package service

func NewDefaultDeviceCommandStateOrchestrator(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceCommandStateOrchestrator {
	_, state, events := NewDefaultDeviceStateStack(
		integrations,
	)

	validator := NewDeviceCommandValidator(
		NewDefaultDeviceCommandPolicy(),
	)

	commands := NewDeviceCommandApplicationService(
		integrations.DeviceTransport,
		integrations.EventRepository,
	)

	return NewDeviceCommandStateOrchestrator(
		validator,
		state,
		commands,
		NewDeviceCommandEventService(events),
	)
}
