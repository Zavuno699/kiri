package service

func NewDefaultDeviceSystemComposition(
	configs ...DeviceServiceConfig,
) *DeviceSystemComposition {
	config := DeviceServiceConfig{
		HTTPPort: "8080",
	}

	if len(configs) > 0 {
		config = configs[0]
	}

	serviceDependencies := NewDefaultDeviceServiceDependencies(
		config,
	)

	core := NewDefaultDeviceServiceCoreIntegrations()

	worker := NewDefaultDeviceWorkerApplication(
		core,
	)

	dependencies := NewDeviceSystemDependencies(
		serviceDependencies,
		core,
		worker,
	)

	runtime := NewDeviceSystemRuntime(
		dependencies,
	)

	application := NewDeviceSystemApplication(
		NewDeviceSystemLifecycle(runtime),
	)

	owner := NewDeviceSystemOwner(
		application,
	)

	process := NewDeviceSystemProcess(
		owner,
	)

	return NewDeviceSystemComposition(
		process,
		application,
		owner,
	)
}
