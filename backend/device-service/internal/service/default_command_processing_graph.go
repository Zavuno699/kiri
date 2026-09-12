package service

func NewDefaultDeviceCommandProcessingGraph(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceCommandProcessingGraph {
	worker := NewDefaultDeviceCommandWorker(
		integrations,
	)

	runtime := NewDeviceCommandWorkerRuntime(
		worker,
	)

	routes := NewDeviceCommandWorkerRoutes(
		NewDeviceCommandRequestHandler(
			runtime,
		),
	)

	return NewDeviceCommandProcessingGraph(
		worker,
		runtime,
		routes,
	)
}
