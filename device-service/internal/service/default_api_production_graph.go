package service

func NewDefaultDeviceAPIProductionGraph(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceAPIProductionGraph {
	config := NewEnvironmentAPIServerConfig()

	v1 := NewDefaultDeviceApplicationV1Composition(
		integrations,
	)

	root := NewDeviceAPIRootRouter(
		v1,
	)

	handler := root.Handler()

	runtime := NewDefaultDeviceAPIRuntime(
		handler,
		config.Address,
	)

	return NewDeviceAPIProductionGraph(
		config,
		root,
		runtime,
	)
}
