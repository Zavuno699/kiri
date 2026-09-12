package service

import "context"

type DeviceServiceFullRuntimeBootstrap struct {
	Composition *DeviceServiceFullCoreComposition
}

func NewDeviceServiceFullRuntimeBootstrap(
	composition *DeviceServiceFullCoreComposition,
) *DeviceServiceFullRuntimeBootstrap {
	return &DeviceServiceFullRuntimeBootstrap{
		Composition: composition,
	}
}

func (b *DeviceServiceFullRuntimeBootstrap) Start(
	ctx context.Context,
) error {
	return b.Composition.Start(ctx)
}

func (b *DeviceServiceFullRuntimeBootstrap) Stop(
	ctx context.Context,
) error {
	return b.Composition.Stop(ctx)
}
