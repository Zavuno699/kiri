package service

import "context"

type DeviceServiceRuntimeEntry struct {
	Orchestration *DeviceServiceRuntimeOrchestration
}

func NewDeviceServiceRuntimeEntry(
	orchestration *DeviceServiceRuntimeOrchestration,
) *DeviceServiceRuntimeEntry {
	return &DeviceServiceRuntimeEntry{
		Orchestration: orchestration,
	}
}

func (e *DeviceServiceRuntimeEntry) Start(
	ctx context.Context,
) error {
	return e.Orchestration.Start(ctx)
}

func (e *DeviceServiceRuntimeEntry) Stop(
	ctx context.Context,
) error {
	return e.Orchestration.Stop(ctx)
}
