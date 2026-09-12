package service

import "context"

type DeviceDomainRuntime struct {
	Integration *DeviceRuntimeIntegration
	Health      *DeviceRuntimeHealth
}

func NewDeviceDomainRuntime(
	integration *DeviceRuntimeIntegration,
	health *DeviceRuntimeHealth,
) *DeviceDomainRuntime {
	return &DeviceDomainRuntime{
		Integration: integration,
		Health:      health,
	}
}

func (r *DeviceDomainRuntime) Start(
	ctx context.Context,
) error {
	return r.Integration.Start(ctx)
}

func (r *DeviceDomainRuntime) Stop(
	ctx context.Context,
) error {
	return r.Integration.Stop(ctx)
}
