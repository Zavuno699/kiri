package service

import "context"

type DeviceSystemLifecycle struct {
	Runtime *DeviceSystemRuntime
}

func NewDeviceSystemLifecycle(
	runtime *DeviceSystemRuntime,
) *DeviceSystemLifecycle {
	return &DeviceSystemLifecycle{
		Runtime: runtime,
	}
}

func (l *DeviceSystemLifecycle) Start(
	ctx context.Context,
) error {
	return l.Runtime.Start(ctx)
}

func (l *DeviceSystemLifecycle) Stop(
	ctx context.Context,
) error {
	return l.Runtime.Stop(ctx)
}
