package service

import "context"

type DeviceServiceSystemRuntime struct {
	System *DeviceSystemComposition
}

func NewDeviceServiceSystemRuntime(
	system *DeviceSystemComposition,
) *DeviceServiceSystemRuntime {
	return &DeviceServiceSystemRuntime{
		System: system,
	}
}

func (r *DeviceServiceSystemRuntime) Start(
	ctx context.Context,
) error {
	return r.System.Start(ctx)
}

func (r *DeviceServiceSystemRuntime) Stop(
	ctx context.Context,
) error {
	return r.System.Stop(ctx)
}
