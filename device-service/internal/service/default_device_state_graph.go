package service

func NewDefaultDeviceStateGraph(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceStateGraph {
	_, state, events := NewDefaultDeviceStateStack(
		integrations,
	)

	query := NewDeviceStateQueryApplication(
		NewDeviceStateQuery(
			integrations.Repository,
		),
	)

	lifecycle := NewDeviceLifecycleApplication(
		NewDeviceLifecycleService(
			state,
			events,
		),
	)

	command := NewDefaultDeviceCommandStateOrchestrator(
		integrations,
	)

	return NewDeviceStateGraph(
		query,
		lifecycle,
		command,
	)
}
