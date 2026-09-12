package service

import "context"

type DeviceServiceCoreIntegrationFacade struct {
	Owner *DeviceServiceCoreOwner
}

func NewDeviceServiceCoreIntegrationFacade(
	owner *DeviceServiceCoreOwner,
) *DeviceServiceCoreIntegrationFacade {
	return &DeviceServiceCoreIntegrationFacade{
		Owner: owner,
	}
}

func (f *DeviceServiceCoreIntegrationFacade) Start(
	ctx context.Context,
) error {
	return f.Owner.Start(ctx)
}

func (f *DeviceServiceCoreIntegrationFacade) Stop(
	ctx context.Context,
) error {
	return f.Owner.Stop(ctx)
}
