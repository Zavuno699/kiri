package service

import "context"

type DeviceOperationalComposition struct {
	Runtime *DeviceOperationalRuntime
}

func NewDeviceOperationalComposition(
	runtime *DeviceOperationalRuntime,
) *DeviceOperationalComposition {
	return &DeviceOperationalComposition{
		Runtime: runtime,
	}
}

func (c *DeviceOperationalComposition) Start(
	ctx context.Context,
) error {
	return c.Runtime.Startup.Start(ctx)
}

func (c *DeviceOperationalComposition) Stop(
	ctx context.Context,
) error {
	return c.Runtime.Shutdown.Shutdown(ctx)
}
