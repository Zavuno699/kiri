package service

import "context"

type DeviceServiceKernel struct {
	Runtime *DeviceServiceRuntimeFacade
}

func NewDeviceServiceKernel(
	runtime *DeviceServiceRuntimeFacade,
) *DeviceServiceKernel {
	return &DeviceServiceKernel{
		Runtime: runtime,
	}
}

func (k *DeviceServiceKernel) Start(
	ctx context.Context,
) error {
	return k.Runtime.Start(ctx)
}

func (k *DeviceServiceKernel) Stop(
	ctx context.Context,
) error {
	return k.Runtime.Stop(ctx)
}
