package service

func NewDefaultDeviceSystemApplication() *DeviceSystemApplication {
	serviceDependencies := NewDefaultDeviceServiceDependencies(
		DeviceServiceConfig{},
	)

	integrations := NewDefaultDeviceServiceCoreIntegrations()

	worker := NewDefaultDeviceWorkerApplication(
		integrations,
	)

	dependencies := NewDeviceSystemDependencies(
		serviceDependencies,
		integrations,
		worker,
	)

	runtime := NewDeviceSystemRuntime(
		dependencies,
	)

	return NewDeviceSystemApplication(
		NewDeviceSystemLifecycle(runtime),
	)
}
