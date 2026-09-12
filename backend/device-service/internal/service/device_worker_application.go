package service

import "context"

type DeviceWorkerApplication struct {
	Lifecycle *DeviceWorkerLifecycle
}

func NewDeviceWorkerApplication(
	lifecycle *DeviceWorkerLifecycle,
) *DeviceWorkerApplication {
	return &DeviceWorkerApplication{
		Lifecycle: lifecycle,
	}
}

func (a *DeviceWorkerApplication) Start(
	ctx context.Context,
) error {
	return a.Lifecycle.Start(ctx)
}

func (a *DeviceWorkerApplication) Stop(
	ctx context.Context,
) error {
	return a.Lifecycle.Stop(ctx)
}
