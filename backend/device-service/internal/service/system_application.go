package service

import "context"

type DeviceSystemApplication struct {
	Lifecycle *DeviceSystemLifecycle
}

func NewDeviceSystemApplication(
	lifecycle *DeviceSystemLifecycle,
) *DeviceSystemApplication {
	return &DeviceSystemApplication{
		Lifecycle: lifecycle,
	}
}

func (a *DeviceSystemApplication) Start(
	ctx context.Context,
) error {
	return a.Lifecycle.Start(ctx)
}

func (a *DeviceSystemApplication) Stop(
	ctx context.Context,
) error {
	return a.Lifecycle.Stop(ctx)
}
