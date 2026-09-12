package service

import "context"

type DeviceServiceOwnerComposition struct {
	Owner DeviceServiceOwnershipContract
}

func NewDeviceServiceOwnerComposition(
	owner DeviceServiceOwnershipContract,
) *DeviceServiceOwnerComposition {
	return &DeviceServiceOwnerComposition{
		Owner: owner,
	}
}

func (c *DeviceServiceOwnerComposition) Start(
	ctx context.Context,
) error {
	return c.Owner.Start(ctx)
}

func (c *DeviceServiceOwnerComposition) Stop(
	ctx context.Context,
) error {
	return c.Owner.Stop(ctx)
}
