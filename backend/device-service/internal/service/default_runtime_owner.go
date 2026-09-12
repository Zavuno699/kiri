package service

func NewDefaultDeviceServiceRuntimeOwner(
	config DeviceServiceConfig,
) *DeviceServiceRuntimeOwner {

	system := NewDefaultDeviceSystemComposition(
		config,
	)

	runtime := NewDeviceServiceSystemRuntime(
		system,
	)

	return NewDeviceServiceRuntimeOwner(
		runtime,
	)
}
