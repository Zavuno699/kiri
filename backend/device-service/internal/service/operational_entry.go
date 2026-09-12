package service

import "context"

type DeviceOperationalEntry struct {
	Owner *DeviceOperationalOwner
}

func NewDeviceOperationalEntry(
	owner *DeviceOperationalOwner,
) *DeviceOperationalEntry {
	return &DeviceOperationalEntry{
		Owner: owner,
	}
}

func (e *DeviceOperationalEntry) Start(
	ctx context.Context,
) error {
	return e.Owner.Start(ctx)
}

func (e *DeviceOperationalEntry) Stop(
	ctx context.Context,
) error {
	return e.Owner.Stop(ctx)
}
