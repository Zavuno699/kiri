package service

func NewDefaultDeviceWorkerGraph(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceWorkerGraph {
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

	worker := NewDeviceWorker(
		handler,
		integrations.MessageBus,
		DefaultDeviceEventTopics(),
	)

	runtime := NewDeviceWorkerRuntime(worker)

	lifecycle := NewDeviceWorkerLifecycle(runtime)

	application := NewDeviceWorkerApplication(lifecycle)

	return NewDeviceWorkerGraph(
		processor,
		handler,
		worker,
		runtime,
		lifecycle,
		application,
	)
}
