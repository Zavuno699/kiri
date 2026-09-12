package service

import "context"

type DeviceServiceCoreLifecycle struct {
	Application *DeviceServiceCoreApplication
}

func NewDeviceServiceCoreLifecycle(
	application *DeviceServiceCoreApplication,
) *DeviceServiceCoreLifecycle {
	return &DeviceServiceCoreLifecycle{
		Application: application,
	}
}

func (l *DeviceServiceCoreLifecycle) Start(
	ctx context.Context,
) error {
	return l.Application.Start(ctx)
}

func (l *DeviceServiceCoreLifecycle) Stop(
	ctx context.Context,
) error {
	return l.Application.Stop(ctx)
}
