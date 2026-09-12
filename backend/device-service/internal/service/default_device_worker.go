package service

func NewDefaultDeviceWorker(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceWorker {
	status := NewDeviceStatusService(
		integrations.Repository,
	)

	processor := NewDeviceEventProcessor(
		integrations.EventRepository,
		status,
	)

	handler := NewDeviceServiceEventHandler(
		processor,
	)

	return NewDeviceWorker(
		handler,
		integrations.MessageBus,
		DefaultDeviceEventTopics(),
	)
}
