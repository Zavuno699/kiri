package service

func NewDefaultDeviceLifecycleStack(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceLifecycleApplication {
	_, state, events := NewDefaultDeviceStateStack(
		integrations,
	)

	return NewDeviceLifecycleApplication(
		NewDeviceLifecycleService(
			state,
			events,
		),
	)
}
