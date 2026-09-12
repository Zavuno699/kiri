package service

type DeviceServiceRuntimeIntegration struct {
	Runtime       *DeviceProductionRuntime
	Observability *DeviceServiceObservabilityComposition
}

func NewDeviceServiceRuntimeIntegration(
	runtime *DeviceProductionRuntime,
	observability *DeviceServiceObservabilityComposition,
) *DeviceServiceRuntimeIntegration {
	return &DeviceServiceRuntimeIntegration{
		Runtime:       runtime,
		Observability: observability,
	}
}
