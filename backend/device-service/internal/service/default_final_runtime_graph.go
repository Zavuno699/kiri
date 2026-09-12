package service

func NewDefaultDeviceServiceFinalRuntimeGraph(
	config DeviceServiceConfig,
) *DeviceServiceFinalRuntimeGraph {

	system := NewDefaultDeviceSystemComposition(
		config,
	)

	runtime := NewDeviceServiceSystemRuntime(
		system,
	)

	return NewDeviceServiceFinalRuntimeGraph(
		runtime,
	)
}
