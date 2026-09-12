package service

import "context"

type DeviceServiceRuntimeOwnerComposition struct {
	Owner *DeviceServiceRuntimeOwner
}

func NewDeviceServiceRuntimeOwnerComposition(
	owner *DeviceServiceRuntimeOwner,
) *DeviceServiceRuntimeOwnerComposition {
	return &DeviceServiceRuntimeOwnerComposition{
		Owner: owner,
	}
}

func (c *DeviceServiceRuntimeOwnerComposition) Start(
	ctx context.Context,
) error {
	return c.Owner.Start(ctx)
}

func (c *DeviceServiceRuntimeOwnerComposition) Stop(
	ctx context.Context,
) error {
	return c.Owner.Stop(ctx)
}
