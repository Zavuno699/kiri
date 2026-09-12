package service

import "context"

type DeviceOperationalOwner struct {
	Composition *DeviceOperationalComposition
}

func NewDeviceOperationalOwner(
	composition *DeviceOperationalComposition,
) *DeviceOperationalOwner {
	return &DeviceOperationalOwner{
		Composition: composition,
	}
}

func (o *DeviceOperationalOwner) Start(
	ctx context.Context,
) error {
	return o.Composition.Start(ctx)
}

func (o *DeviceOperationalOwner) Stop(
	ctx context.Context,
) error {
	return o.Composition.Stop(ctx)
}
