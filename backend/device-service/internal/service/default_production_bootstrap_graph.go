package service

func NewDefaultDeviceProductionBootstrapGraph() *DeviceProductionBootstrapGraph {
	settings := NewEnvironmentProductionSettings()

	runtime := NewDefaultDeviceProductionProcessRuntime(
		settings.Config,
	)

	process := NewDeviceProductionProcess(
		runtime,
	)

	return NewDeviceProductionBootstrapGraph(
		settings,
		runtime,
		process,
	)
}
