package service

func NewDefaultDeviceServiceObservabilityComposition(
	dependencies *DeviceServiceDependencies,
) *DeviceServiceObservabilityComposition {

	logger := NewRuntimeLoggerAdapter(
		dependencies.Logger,
	)

	metrics := NewRuntimeMetricsAdapter(
		dependencies.Metrics,
	)

	runtime := NewDeviceServiceObservabilityRuntime(
		logger,
		metrics,
	)

	return NewDeviceServiceObservabilityComposition(
		runtime,
	)
}
