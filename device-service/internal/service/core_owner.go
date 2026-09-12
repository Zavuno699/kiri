package service

import "context"

type DeviceServiceCoreOwner struct {
	Lifecycle *DeviceServiceCoreLifecycle
}

func NewDeviceServiceCoreOwner(
	lifecycle *DeviceServiceCoreLifecycle,
) *DeviceServiceCoreOwner {
	return &DeviceServiceCoreOwner{
		Lifecycle: lifecycle,
	}
}

func (o *DeviceServiceCoreOwner) Start(
	ctx context.Context,
) error {
	return o.Lifecycle.Start(ctx)
}

func (o *DeviceServiceCoreOwner) Stop(
	ctx context.Context,
) error {
	return o.Lifecycle.Stop(ctx)
}
