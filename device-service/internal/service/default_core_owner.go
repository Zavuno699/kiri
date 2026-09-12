package service

func NewDefaultDeviceServiceCoreOwner() *DeviceServiceCoreOwner {
	runtime := NewDefaultDeviceServiceCoreRuntime()

	application := NewDeviceServiceCoreApplication(
		runtime,
	)

	lifecycle := NewDeviceServiceCoreLifecycle(
		application,
	)

	return NewDeviceServiceCoreOwner(
		lifecycle,
	)
}
