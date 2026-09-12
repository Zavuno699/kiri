package service

import "context"

type DeviceProductionBootstrap struct {
	Runtime *DeviceServiceRuntimeOwnerEntry
}

func NewDeviceProductionBootstrap(
	runtime *DeviceServiceRuntimeOwnerEntry,
) *DeviceProductionBootstrap {
	return &DeviceProductionBootstrap{
		Runtime: runtime,
	}
}

func (b *DeviceProductionBootstrap) Start(
	ctx context.Context,
) error {
	return b.Runtime.Start(ctx)
}

func (b *DeviceProductionBootstrap) Stop(
	ctx context.Context,
) error {
	return b.Runtime.Stop(ctx)
}
