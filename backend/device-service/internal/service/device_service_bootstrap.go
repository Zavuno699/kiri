package service

import "context"

type DeviceServiceBootstrap struct {
	HTTP DeviceHealthHTTPServiceContract
}

func NewDeviceServiceBootstrap(
	httpService DeviceHealthHTTPServiceContract,
) *DeviceServiceBootstrap {
	return &DeviceServiceBootstrap{
		HTTP: httpService,
	}
}

func (b *DeviceServiceBootstrap) Start(
	ctx context.Context,
) error {
	return b.HTTP.Start(ctx)
}

func (b *DeviceServiceBootstrap) Stop(
	ctx context.Context,
) error {
	return b.HTTP.Stop(ctx)
}
