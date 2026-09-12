package service

import "context"

type DeviceOperationalSystem struct {
	Entry *DeviceOperationalEntry
}

func NewDeviceOperationalSystem(
	entry *DeviceOperationalEntry,
) *DeviceOperationalSystem {
	return &DeviceOperationalSystem{
		Entry: entry,
	}
}

func (s *DeviceOperationalSystem) Start(
	ctx context.Context,
) error {
	return s.Entry.Start(ctx)
}

func (s *DeviceOperationalSystem) Stop(
	ctx context.Context,
) error {
	return s.Entry.Stop(ctx)
}
