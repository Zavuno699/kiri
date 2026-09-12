package service

import "context"

type DeviceProductionLifecycle struct {
	Bootstrap *DeviceProductionBootstrap
}

func NewDeviceProductionLifecycle(
	bootstrap *DeviceProductionBootstrap,
) *DeviceProductionLifecycle {
	return &DeviceProductionLifecycle{
		Bootstrap: bootstrap,
	}
}

func (l *DeviceProductionLifecycle) Start(
	ctx context.Context,
) error {
	return l.Bootstrap.Start(ctx)
}

func (l *DeviceProductionLifecycle) Stop(
	ctx context.Context,
) error {
	return l.Bootstrap.Stop(ctx)
}
