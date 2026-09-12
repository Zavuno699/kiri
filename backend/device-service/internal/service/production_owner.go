package service

import "context"

type DeviceProductionOwner struct {
	Composition *DeviceProductionComposition
}

func NewDeviceProductionOwner(
	composition *DeviceProductionComposition,
) *DeviceProductionOwner {
	return &DeviceProductionOwner{
		Composition: composition,
	}
}

func (o *DeviceProductionOwner) Start(
	ctx context.Context,
) error {
	return o.Composition.Start(ctx)
}

func (o *DeviceProductionOwner) Stop(
	ctx context.Context,
) error {
	return o.Composition.Stop(ctx)
}
