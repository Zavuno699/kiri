package service

import "context"

var _ DeviceServiceRuntimeContract = (*DeviceServiceComposition)(nil)

type DeviceServiceComposition struct {
	Application DeviceServiceApplicationContract
}

func NewDeviceServiceComposition(
	application DeviceServiceApplicationContract,
) *DeviceServiceComposition {
	return &DeviceServiceComposition{
		Application: application,
	}
}

func (c *DeviceServiceComposition) Start(
	ctx context.Context,
) error {
	return c.Application.Start(ctx)
}

func (c *DeviceServiceComposition) Stop(
	ctx context.Context,
) error {
	return c.Application.Stop(ctx)
}
