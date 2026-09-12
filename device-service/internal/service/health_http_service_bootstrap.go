package service

import "context"

type DeviceHealthHTTPServiceBootstrap struct {
	Service DeviceHealthHTTPServiceContract
}

func NewDeviceHealthHTTPServiceBootstrap(
	service DeviceHealthHTTPServiceContract,
) *DeviceHealthHTTPServiceBootstrap {
	return &DeviceHealthHTTPServiceBootstrap{
		Service: service,
	}
}

func (b *DeviceHealthHTTPServiceBootstrap) Start(
	ctx context.Context,
) error {
	return b.Service.Start(ctx)
}

func (b *DeviceHealthHTTPServiceBootstrap) Stop(
	ctx context.Context,
) error {
	return b.Service.Stop(ctx)
}
