package service

import "context"

type DeviceServiceRuntimeOwnerEntry struct {
	Composition *DeviceServiceRuntimeOwnerComposition
}

func NewDeviceServiceRuntimeOwnerEntry(
	composition *DeviceServiceRuntimeOwnerComposition,
) *DeviceServiceRuntimeOwnerEntry {
	return &DeviceServiceRuntimeOwnerEntry{
		Composition: composition,
	}
}

func (e *DeviceServiceRuntimeOwnerEntry) Start(
	ctx context.Context,
) error {
	return e.Composition.Start(ctx)
}

func (e *DeviceServiceRuntimeOwnerEntry) Stop(
	ctx context.Context,
) error {
	return e.Composition.Stop(ctx)
}
