package service

type DeviceServiceObservabilityRuntime struct {
	Logger  *RuntimeLoggerAdapter
	Metrics *RuntimeMetricsAdapter
}

func NewDeviceServiceObservabilityRuntime(
	logger *RuntimeLoggerAdapter,
	metrics *RuntimeMetricsAdapter,
) *DeviceServiceObservabilityRuntime {
	return &DeviceServiceObservabilityRuntime{
		Logger:  logger,
		Metrics: metrics,
	}
}
