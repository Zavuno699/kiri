package service

import "context"

var _ DeviceServiceRuntimeContract = (*DeviceServiceRuntime)(nil)

type DeviceServiceRuntime struct {
	Bootstrap *DeviceServiceBootstrap
}

func NewDeviceServiceRuntime(
	bootstrap *DeviceServiceBootstrap,
) *DeviceServiceRuntime {
	return &DeviceServiceRuntime{
		Bootstrap: bootstrap,
	}
}

func (r *DeviceServiceRuntime) Start(
	ctx context.Context,
) error {
	return r.Bootstrap.Start(ctx)
}

func (r *DeviceServiceRuntime) Stop(
	ctx context.Context,
) error {
	return r.Bootstrap.Stop(ctx)
}
