package service

import "context"

type DeviceServiceSystemComposition struct {
	System DeviceServiceOwnershipContract
}

func NewDeviceServiceSystemComposition(
	system DeviceServiceOwnershipContract,
) *DeviceServiceSystemComposition {
	return &DeviceServiceSystemComposition{
		System: system,
	}
}

func (c *DeviceServiceSystemComposition) Start(
	ctx context.Context,
) error {
	return c.System.Start(ctx)
}

func (c *DeviceServiceSystemComposition) Stop(
	ctx context.Context,
) error {
	return c.System.Stop(ctx)
}
