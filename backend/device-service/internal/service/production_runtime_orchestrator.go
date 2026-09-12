package service

import "context"

type DeviceProductionRuntimeOrchestrator struct {
	Lifecycle *DeviceProductionRuntimeLifecycle
}

func NewDeviceProductionRuntimeOrchestrator(
	lifecycle *DeviceProductionRuntimeLifecycle,
) *DeviceProductionRuntimeOrchestrator {
	return &DeviceProductionRuntimeOrchestrator{
		Lifecycle: lifecycle,
	}
}

func (o *DeviceProductionRuntimeOrchestrator) Start(
	ctx context.Context,
) error {
	return o.Lifecycle.Start(ctx)
}

func (o *DeviceProductionRuntimeOrchestrator) Stop(
	ctx context.Context,
) error {
	return o.Lifecycle.Stop(ctx)
}
