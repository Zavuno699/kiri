package service

import "context"

type DeviceServiceOwnerApplication struct {
	Runtime DeviceServiceOwnershipContract
}

func NewDeviceServiceOwnerApplication(
	runtime DeviceServiceOwnershipContract,
) *DeviceServiceOwnerApplication {
	return &DeviceServiceOwnerApplication{
		Runtime: runtime,
	}
}

func (a *DeviceServiceOwnerApplication) Start(
	ctx context.Context,
) error {
	return a.Runtime.Start(ctx)
}

func (a *DeviceServiceOwnerApplication) Stop(
	ctx context.Context,
) error {
	return a.Runtime.Stop(ctx)
}
