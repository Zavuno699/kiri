package service

func NewDefaultDeviceIntegrationGraph(
	dependencies *DeviceServiceDependencies,
) *DeviceIntegrationGraph {
	config := NewEnvironmentDeviceIntegrationConfig()

	runtime := NewDefaultDeviceServiceIntegrationRuntime(
		dependencies,
	)

	readiness := NewDeviceIntegrationReadiness(
		runtime.Database,
		runtime.MessageBus,
		runtime.Transport,
	)

	lifecycle := NewDeviceIntegrationLifecycle(
		runtime,
		readiness,
	)

	owner := NewDeviceServiceIntegrationOwner(
		runtime,
	)

	return NewDeviceIntegrationGraph(
		config,
		runtime,
		readiness,
		lifecycle,
		owner,
	)
}
