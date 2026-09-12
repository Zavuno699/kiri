package service

import "context"

type DeviceHealthHTTPProductionBootstrap struct {
	Lifecycle *DeviceHealthHTTPProductionLifecycle
}

func NewDeviceHealthHTTPProductionBootstrap(
	lifecycle *DeviceHealthHTTPProductionLifecycle,
) *DeviceHealthHTTPProductionBootstrap {
	return &DeviceHealthHTTPProductionBootstrap{
		Lifecycle: lifecycle,
	}
}

func (b *DeviceHealthHTTPProductionBootstrap) Start(
	ctx context.Context,
) error {
	return b.Lifecycle.Start(ctx)
}

func (b *DeviceHealthHTTPProductionBootstrap) Stop(
	ctx context.Context,
) error {
	return b.Lifecycle.Stop(ctx)
}
