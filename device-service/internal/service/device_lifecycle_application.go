package service

import "context"

type DeviceLifecycleApplication struct {
	Lifecycle *DeviceLifecycleService
}

func NewDeviceLifecycleApplication(
	lifecycle *DeviceLifecycleService,
) *DeviceLifecycleApplication {
	return &DeviceLifecycleApplication{
		Lifecycle: lifecycle,
	}
}

func (a *DeviceLifecycleApplication) Register(
	ctx context.Context,
	deviceID string,
) error {
	return a.Lifecycle.Register(ctx, deviceID)
}

func (a *DeviceLifecycleApplication) Connect(
	ctx context.Context,
	deviceID string,
) error {
	return a.Lifecycle.Connect(ctx, deviceID)
}

func (a *DeviceLifecycleApplication) Disconnect(
	ctx context.Context,
	deviceID string,
) error {
	return a.Lifecycle.Disconnect(ctx, deviceID)
}

func (a *DeviceLifecycleApplication) Fail(
	ctx context.Context,
	deviceID string,
) error {
	return a.Lifecycle.Fail(ctx, deviceID)
}
