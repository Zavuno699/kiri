package service

import "context"

type DeviceServiceOwnershipContract interface {
	Start(context.Context) error
	Stop(context.Context) error
}

var _ DeviceServiceOwnershipContract = (*DeviceServiceOwner)(nil)

type DeviceServiceOwner struct {
	Runtime DeviceServiceOwnershipContract
}

func NewDeviceServiceOwner(
	runtime DeviceServiceOwnershipContract,
) *DeviceServiceOwner {
	return &DeviceServiceOwner{
		Runtime: runtime,
	}
}

func (o *DeviceServiceOwner) Start(
	ctx context.Context,
) error {
	return o.Runtime.Start(ctx)
}

func (o *DeviceServiceOwner) Stop(
	ctx context.Context,
) error {
	return o.Runtime.Stop(ctx)
}
