package service

import "context"

type DeviceServiceOwnerRuntime struct {
	Owner DeviceServiceOwnershipContract
}

func NewDeviceServiceOwnerRuntime(
	owner DeviceServiceOwnershipContract,
) *DeviceServiceOwnerRuntime {
	return &DeviceServiceOwnerRuntime{
		Owner: owner,
	}
}

func (r *DeviceServiceOwnerRuntime) Start(
	ctx context.Context,
) error {
	return r.Owner.Start(ctx)
}

func (r *DeviceServiceOwnerRuntime) Stop(
	ctx context.Context,
) error {
	return r.Owner.Stop(ctx)
}
