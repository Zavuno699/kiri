package service

import "context"

type DeviceSystemComposition struct {
	Process     *DeviceSystemProcess
	Application *DeviceSystemApplication
	Owner       *DeviceSystemOwner
}

func NewDeviceSystemComposition(
	process *DeviceSystemProcess,
	application *DeviceSystemApplication,
	owner *DeviceSystemOwner,
) *DeviceSystemComposition {
	return &DeviceSystemComposition{
		Process:     process,
		Application: application,
		Owner:       owner,
	}
}

func (c *DeviceSystemComposition) Start(
	ctx context.Context,
) error {
	return c.Owner.Start(ctx)
}

func (c *DeviceSystemComposition) Stop(
	ctx context.Context,
) error {
	return c.Owner.Stop(ctx)
}
