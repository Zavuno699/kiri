package service

import "context"

type DeviceProductionServiceOwner struct {
	Lifecycle *DeviceProductionServiceLifecycle
}

func NewDeviceProductionServiceOwner(
	lifecycle *DeviceProductionServiceLifecycle,
) *DeviceProductionServiceOwner {
	return &DeviceProductionServiceOwner{
		Lifecycle: lifecycle,
	}
}

func (o *DeviceProductionServiceOwner) Start(
	ctx context.Context,
) error {
	return o.Lifecycle.Start(ctx)
}

func (o *DeviceProductionServiceOwner) Stop(
	ctx context.Context,
) error {
	return o.Lifecycle.Stop(ctx)
}
