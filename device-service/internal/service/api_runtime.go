package service

import "context"

type DeviceAPIRuntime struct {
	API *DeviceAPIApplicationOwner
}

func NewDeviceAPIRuntime(
	api *DeviceAPIApplicationOwner,
) *DeviceAPIRuntime {
	return &DeviceAPIRuntime{
		API: api,
	}
}

func (r *DeviceAPIRuntime) Start(
	ctx context.Context,
) error {
	return r.API.Start(ctx)
}

func (r *DeviceAPIRuntime) Stop(
	ctx context.Context,
) error {
	return r.API.Stop(ctx)
}
