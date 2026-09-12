package service

type DeviceServiceObservabilityComposition struct {
	Observability *DeviceServiceObservabilityRuntime
}

func NewDeviceServiceObservabilityComposition(
	observability *DeviceServiceObservabilityRuntime,
) *DeviceServiceObservabilityComposition {
	return &DeviceServiceObservabilityComposition{
		Observability: observability,
	}
}
