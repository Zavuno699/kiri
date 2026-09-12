package service

type DeviceObservabilityGraph struct {
	MetricsRegistry *DeviceMetricsRegistry
	Metrics         *DeviceMetricsAdapter
	Health          *DeviceHealthRuntimeObserver
	Runtime         *DeviceRuntimeObserver
}

func NewDefaultDeviceObservabilityGraph(
	logger DeviceServiceLogger,
	state *DeviceRuntimeState,
) *DeviceObservabilityGraph {
	registry := NewDeviceMetricsRegistry()

	metrics := NewDeviceMetricsAdapter(
		registry,
	)

	health := NewDeviceHealthRuntimeObserver(
		state,
	)

	runtime := NewDeviceRuntimeObserver(
		logger,
		metrics,
		health,
	)

	return &DeviceObservabilityGraph{
		MetricsRegistry: registry,
		Metrics:         metrics,
		Health:          health,
		Runtime:         runtime,
	}
}
