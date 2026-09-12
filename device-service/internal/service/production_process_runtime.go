package service

import "context"

type DeviceProductionProcessRuntime struct {
	Orchestrator *DeviceProductionRuntimeOrchestrator
}

func NewDeviceProductionProcessRuntime(
	orchestrator *DeviceProductionRuntimeOrchestrator,
) *DeviceProductionProcessRuntime {
	return &DeviceProductionProcessRuntime{
		Orchestrator: orchestrator,
	}
}

func (r *DeviceProductionProcessRuntime) Start(
	ctx context.Context,
) error {
	return r.Orchestrator.Start(ctx)
}

func (r *DeviceProductionProcessRuntime) Stop(
	ctx context.Context,
) error {
	return r.Orchestrator.Stop(ctx)
}
