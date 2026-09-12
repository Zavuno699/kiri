package service

import "context"

type DeviceSystemOwner struct {
	Application *DeviceSystemApplication
}

func NewDeviceSystemOwner(
	application *DeviceSystemApplication,
) *DeviceSystemOwner {
	return &DeviceSystemOwner{
		Application: application,
	}
}

func (o *DeviceSystemOwner) Start(
	ctx context.Context,
) error {
	return o.Application.Start(ctx)
}

func (o *DeviceSystemOwner) Stop(
	ctx context.Context,
) error {
	return o.Application.Stop(ctx)
}
