package service

import "context"

type DeviceProductionComposition struct {
	Runtime *DeviceProductionRuntime
}

func NewDeviceProductionComposition(
	runtime *DeviceProductionRuntime,
) *DeviceProductionComposition {
	return &DeviceProductionComposition{
		Runtime: runtime,
	}
}

func (c *DeviceProductionComposition) Start(
	ctx context.Context,
) error {
	return c.Runtime.Start(ctx)
}

func (c *DeviceProductionComposition) Stop(
	ctx context.Context,
) error {
	return c.Runtime.Stop(ctx)
}
