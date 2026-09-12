package service

func NewDefaultDeviceServiceRuntimeFacade(
	config DeviceServiceConfig,
) *DeviceServiceRuntimeFacade {

	graph := NewDefaultDeviceServiceFinalRuntimeGraph(
		config,
	)

	return NewDeviceServiceRuntimeFacade(
		graph,
	)
}
