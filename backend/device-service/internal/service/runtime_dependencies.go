package service

type DeviceServiceDependencies struct {
	Config  DeviceServiceConfigProvider
	Logger  DeviceServiceLogger
	Metrics DeviceServiceMetrics
}

func NewDeviceServiceDependencies(
	config DeviceServiceConfigProvider,
	logger DeviceServiceLogger,
	metrics DeviceServiceMetrics,
) *DeviceServiceDependencies {
	return &DeviceServiceDependencies{
		Config:  config,
		Logger:  logger,
		Metrics: metrics,
	}
}
