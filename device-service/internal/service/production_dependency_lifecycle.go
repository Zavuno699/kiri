package service

import "context"

type DeviceProductionDependencyLifecycle struct {
	Owner *DeviceInfrastructureOwner
}

func NewDeviceProductionDependencyLifecycle(
	owner *DeviceInfrastructureOwner,
) *DeviceProductionDependencyLifecycle {
	return &DeviceProductionDependencyLifecycle{
		Owner: owner,
	}
}

func (l *DeviceProductionDependencyLifecycle) Start(
	ctx context.Context,
) error {
	return l.Owner.Start(ctx)
}

func (l *DeviceProductionDependencyLifecycle) Stop(
	ctx context.Context,
) error {
	return l.Owner.Stop(ctx)
}
