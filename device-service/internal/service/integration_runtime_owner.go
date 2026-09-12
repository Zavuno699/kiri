package service

import "context"

type DeviceIntegrationRuntimeOwner struct {
	Application *DeviceIntegrationApplication
}

func NewDeviceIntegrationRuntimeOwner(
	application *DeviceIntegrationApplication,
) *DeviceIntegrationRuntimeOwner {
	return &DeviceIntegrationRuntimeOwner{
		Application: application,
	}
}

func (o *DeviceIntegrationRuntimeOwner) Start(
	ctx context.Context,
) error {
	return o.Application.Start(ctx)
}

func (o *DeviceIntegrationRuntimeOwner) Stop(
	ctx context.Context,
) error {
	return o.Application.Stop(ctx)
}
