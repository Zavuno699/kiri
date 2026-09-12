package service

func NewDefaultDeviceApplicationAPIServices(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceApplicationAPIServices {
	commands := NewDeviceCommandApplicationService(
		integrations.DeviceTransport,
		integrations.EventRepository,
	)

	mapper := NewDeviceCommandMapper(
		NewDefaultDeviceCommandRegistry(),
	)

	command := NewDeviceCommandApplication(
		commands,
		mapper,
	)

	query := NewDeviceQueryApplication(
		NewDeviceApplicationQueryController(
			NewDeviceQueryService(
				integrations.Repository,
			),
		),
	)

	registration := NewDeviceRegistrationApplication(
		NewDeviceRegistrationService(
			integrations.Repository,
		),
	)

	status := NewDeviceStatusApplication(
		NewDeviceStatusService(
			integrations.Repository,
		),
	)

	return NewDeviceApplicationAPIServices(
		command,
		query,
		registration,
		status,
	)
}
