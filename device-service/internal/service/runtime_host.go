package service

import "context"

type DeviceServiceRuntimeHost struct {
	Entry *DeviceServiceRuntimeEntry
}

func NewDeviceServiceRuntimeHost(
	entry *DeviceServiceRuntimeEntry,
) *DeviceServiceRuntimeHost {
	return &DeviceServiceRuntimeHost{
		Entry: entry,
	}
}

func (h *DeviceServiceRuntimeHost) Start(
	ctx context.Context,
) error {
	return h.Entry.Start(ctx)
}

func (h *DeviceServiceRuntimeHost) Stop(
	ctx context.Context,
) error {
	return h.Entry.Stop(ctx)
}
