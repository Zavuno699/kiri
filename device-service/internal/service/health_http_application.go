package service

import "context"

type DeviceHealthHTTPApplication struct {
	Bootstrap *DeviceHealthHTTPBootstrap
}

func NewDeviceHealthHTTPApplication(
	bootstrap *DeviceHealthHTTPBootstrap,
) *DeviceHealthHTTPApplication {
	return &DeviceHealthHTTPApplication{
		Bootstrap: bootstrap,
	}
}

func (a *DeviceHealthHTTPApplication) Start(
	ctx context.Context,
) error {
	return a.Bootstrap.Start(ctx)
}

func (a *DeviceHealthHTTPApplication) Stop(
	ctx context.Context,
) error {
	return a.Bootstrap.Stop(ctx)
}
