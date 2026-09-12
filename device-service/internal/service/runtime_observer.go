package service

import "context"

type DeviceRuntimeObserver struct {
	Logger  DeviceServiceLogger
	Metrics *DeviceMetricsAdapter
	Health  *DeviceHealthRuntimeObserver
}

func NewDeviceRuntimeObserver(
	logger DeviceServiceLogger,
	metrics *DeviceMetricsAdapter,
	health *DeviceHealthRuntimeObserver,
) *DeviceRuntimeObserver {
	return &DeviceRuntimeObserver{
		Logger:  logger,
		Metrics: metrics,
		Health:  health,
	}
}

func (o *DeviceRuntimeObserver) Started(
	context.Context,
) {
	o.Logger.Info("device service started")
	o.Metrics.Increment("runtime_started")
}

func (o *DeviceRuntimeObserver) Stopped(
	context.Context,
) {
	o.Logger.Info("device service stopped")
	o.Metrics.Increment("runtime_stopped")
}

func (o *DeviceRuntimeObserver) Snapshot() DeviceHealthSnapshot {
	return o.Health.Snapshot()
}
