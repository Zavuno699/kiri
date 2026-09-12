package service

import "context"

type DeviceAPIApplicationOwner struct {
	Application *DeviceAPIApplication
}

func NewDeviceAPIApplicationOwner(
	application *DeviceAPIApplication,
) *DeviceAPIApplicationOwner {
	return &DeviceAPIApplicationOwner{
		Application: application,
	}
}

func (o *DeviceAPIApplicationOwner) Start(
	ctx context.Context,
) error {
	return o.Application.Start(ctx)
}

func (o *DeviceAPIApplicationOwner) Stop(
	ctx context.Context,
) error {
	return o.Application.Stop(ctx)
}
