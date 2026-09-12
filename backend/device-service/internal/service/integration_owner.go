package service

import "context"

type DeviceServiceIntegrationOwner struct {
	Runtime *DeviceServiceIntegrationRuntime
}

func NewDeviceServiceIntegrationOwner(
	runtime *DeviceServiceIntegrationRuntime,
) *DeviceServiceIntegrationOwner {
	return &DeviceServiceIntegrationOwner{
		Runtime: runtime,
	}
}

func (o *DeviceServiceIntegrationOwner) Start(
	ctx context.Context,
) error {
	return o.Runtime.Start(ctx)
}

func (o *DeviceServiceIntegrationOwner) Stop(
	ctx context.Context,
) error {
	return o.Runtime.Stop(ctx)
}
