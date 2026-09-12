package service

import "context"

type DeviceInfrastructureOwner struct {
	Runtime *DeviceInfrastructureRuntime
}

func NewDeviceInfrastructureOwner(
	runtime *DeviceInfrastructureRuntime,
) *DeviceInfrastructureOwner {
	return &DeviceInfrastructureOwner{
		Runtime: runtime,
	}
}

func (o *DeviceInfrastructureOwner) Start(
	ctx context.Context,
) error {
	return o.Runtime.Start(ctx)
}

func (o *DeviceInfrastructureOwner) Stop(
	ctx context.Context,
) error {
	return o.Runtime.Stop(ctx)
}
