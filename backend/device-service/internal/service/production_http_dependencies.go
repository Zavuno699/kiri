package service

type DeviceProductionHTTPDependencies struct {
	RuntimeHealth *DeviceRuntimeHealth
	Config        DeviceServiceConfig
}

func NewDeviceProductionHTTPDependencies(
	runtimeHealth *DeviceRuntimeHealth,
	config DeviceServiceConfig,
) *DeviceProductionHTTPDependencies {
	return &DeviceProductionHTTPDependencies{
		RuntimeHealth: runtimeHealth,
		Config:        config,
	}
}
