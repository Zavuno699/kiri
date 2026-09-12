package service

func NewDefaultDeviceCommandWorker(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceCommandWorker {
	applicationServices := NewDefaultDeviceApplicationAPIServices(
		integrations,
	)

	application := applicationServices.Command

	audit := NewDeviceAuditService(
		NewNoopDeviceAuditLogger(),
	)

	execution := NewDeviceCommandExecutionService(
		application,
		audit,
	)

	return NewDeviceCommandWorker(
		execution,
	)
}
