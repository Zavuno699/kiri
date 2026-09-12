package service

type DeviceHealthComposition struct {
	Aggregator *DeviceHealthAggregator
}

func NewDeviceHealthComposition(
	runtimeHealth *DeviceHealthBoundary,
) *DeviceHealthComposition {

	runtimeProvider := NewRuntimeHealthProvider(
		runtimeHealth,
	)

	return &DeviceHealthComposition{
		Aggregator: NewDeviceHealthAggregator(
			runtimeProvider,
		),
	}
}
