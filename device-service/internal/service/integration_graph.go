package service

type DeviceIntegrationGraph struct {
	Config    *DeviceIntegrationConfig
	Runtime   *DeviceServiceIntegrationRuntime
	Readiness *DeviceIntegrationReadiness
	Lifecycle *DeviceIntegrationLifecycle
	Owner     *DeviceServiceIntegrationOwner
}

func NewDeviceIntegrationGraph(
	config *DeviceIntegrationConfig,
	runtime *DeviceServiceIntegrationRuntime,
	readiness *DeviceIntegrationReadiness,
	lifecycle *DeviceIntegrationLifecycle,
	owner *DeviceServiceIntegrationOwner,
) *DeviceIntegrationGraph {
	return &DeviceIntegrationGraph{
		Config:    config,
		Runtime:   runtime,
		Readiness: readiness,
		Lifecycle: lifecycle,
		Owner:     owner,
	}
}
