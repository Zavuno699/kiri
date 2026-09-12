package service

import "context"

type DeviceHealthHTTPBootstrap struct {
	Runtime *DeviceHealthHTTPRuntime
}

func NewDeviceHealthHTTPBootstrap(
	runtime *DeviceHealthHTTPRuntime,
) *DeviceHealthHTTPBootstrap {
	return &DeviceHealthHTTPBootstrap{
		Runtime: runtime,
	}
}

func (b *DeviceHealthHTTPBootstrap) Start(
	ctx context.Context,
) error {
	return b.Runtime.Start(ctx)
}

func (b *DeviceHealthHTTPBootstrap) Stop(
	ctx context.Context,
) error {
	return b.Runtime.Stop(ctx)
}
