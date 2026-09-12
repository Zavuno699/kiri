package service

import "context"

type DeviceServiceRuntimeOwner struct {
	Runtime *DeviceServiceSystemRuntime
}

func NewDeviceServiceRuntimeOwner(
	runtime *DeviceServiceSystemRuntime,
) *DeviceServiceRuntimeOwner {
	return &DeviceServiceRuntimeOwner{
		Runtime: runtime,
	}
}

func (o *DeviceServiceRuntimeOwner) Start(
	ctx context.Context,
) error {
	return o.Runtime.Start(ctx)
}

func (o *DeviceServiceRuntimeOwner) Stop(
	ctx context.Context,
) error {
	return o.Runtime.Stop(ctx)
}
