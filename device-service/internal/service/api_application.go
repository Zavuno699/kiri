package service

import "context"

type DeviceAPIApplication struct {
	Lifecycle *DeviceAPIServerLifecycle
}

func NewDeviceAPIApplication(
	lifecycle *DeviceAPIServerLifecycle,
) *DeviceAPIApplication {
	return &DeviceAPIApplication{
		Lifecycle: lifecycle,
	}
}

func (a *DeviceAPIApplication) Start(
	ctx context.Context,
) error {
	return a.Lifecycle.Start(ctx)
}

func (a *DeviceAPIApplication) Stop(
	ctx context.Context,
) error {
	return a.Lifecycle.Stop(ctx)
}
