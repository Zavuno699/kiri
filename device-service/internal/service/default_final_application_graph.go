package service

func NewDefaultDeviceFinalApplicationGraph() *DeviceFinalApplicationGraph {
	integrations := NewDefaultDeviceServiceCoreIntegrations()

	state := NewDeviceRuntimeState()
	runtimeHealth := NewDeviceRuntimeHealth()

	httpComposition := NewDefaultDeviceFinalHTTPComposition(
		integrations,
		state,
		runtimeHealth,
	)

	core := NewDefaultDeviceServiceCoreIntegrationFacade()

	worker := NewDefaultDeviceWorkerApplication(
		integrations,
	)

	production := NewDefaultDeviceProductionServiceOwner()

	return NewDeviceFinalApplicationGraph(
		httpComposition,
		core,
		worker,
		production,
	)
}
