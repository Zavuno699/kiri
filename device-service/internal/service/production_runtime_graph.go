package service

type DeviceProductionRuntimeGraph struct {
	RuntimeHealth *DeviceRuntimeHealth
	HTTP          *DeviceProductionHTTPService
	Core          *DeviceServiceCoreIntegrationFacade
}

func NewDeviceProductionRuntimeGraph(
	runtimeHealth *DeviceRuntimeHealth,
	httpService *DeviceProductionHTTPService,
	core *DeviceServiceCoreIntegrationFacade,
) *DeviceProductionRuntimeGraph {
	return &DeviceProductionRuntimeGraph{
		RuntimeHealth: runtimeHealth,
		HTTP:          httpService,
		Core:          core,
	}
}
