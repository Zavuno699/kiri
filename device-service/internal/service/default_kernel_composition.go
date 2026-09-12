package service

func NewDefaultDeviceServiceKernelComposition(
	config DeviceServiceConfig,
) *DeviceServiceKernelComposition {

	runtime := NewDefaultDeviceServiceRuntimeFacade(
		config,
	)

	kernel := NewDeviceServiceKernel(
		runtime,
	)

	return NewDeviceServiceKernelComposition(
		kernel,
	)
}
