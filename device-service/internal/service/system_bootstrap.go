package service

import "context"

type DeviceSystemBootstrap struct {
	Composition *DeviceSystemComposition
}

func NewDeviceSystemBootstrap(
	composition *DeviceSystemComposition,
) *DeviceSystemBootstrap {
	return &DeviceSystemBootstrap{
		Composition: composition,
	}
}

func (b *DeviceSystemBootstrap) Run(
	ctx context.Context,
) error {
	return b.Composition.Process.Run(ctx)
}
