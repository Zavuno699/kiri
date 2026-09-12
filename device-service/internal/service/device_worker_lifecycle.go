package service

import "context"

type DeviceWorkerLifecycle struct {
	Runtime *DeviceWorkerRuntime
}

func NewDeviceWorkerLifecycle(
	runtime *DeviceWorkerRuntime,
) *DeviceWorkerLifecycle {
	return &DeviceWorkerLifecycle{
		Runtime: runtime,
	}
}

func (l *DeviceWorkerLifecycle) Start(
	ctx context.Context,
) error {
	return l.Runtime.Start(ctx)
}

func (l *DeviceWorkerLifecycle) Stop(
	ctx context.Context,
) error {
	return l.Runtime.Stop(ctx)
}
