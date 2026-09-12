package service

func NewDefaultDeviceRegistrationOrchestrator(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceRegistrationOrchestrator {
	_, state, events := NewDefaultDeviceStateStack(
		integrations,
	)

	registration := NewDeviceRegistrationApplication(
		NewDeviceRegistrationService(
			integrations.Repository,
		),
	)

	return NewDeviceRegistrationOrchestrator(
		registration,
		state,
		events,
	)
}
