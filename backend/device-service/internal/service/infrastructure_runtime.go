package service

import "context"

type DeviceInfrastructureRuntime struct {
	Dependencies *DeviceInfrastructureDependencies
	Integration  *DeviceServiceIntegrationRuntime
}

func NewDeviceInfrastructureRuntime(
	dependencies *DeviceInfrastructureDependencies,
	integration *DeviceServiceIntegrationRuntime,
) *DeviceInfrastructureRuntime {
	return &DeviceInfrastructureRuntime{
		Dependencies: dependencies,
		Integration:  integration,
	}
}

func (r *DeviceInfrastructureRuntime) Start(
	ctx context.Context,
) error {
	return r.Integration.Start(ctx)
}

func (r *DeviceInfrastructureRuntime) Stop(
	ctx context.Context,
) error {
	return r.Integration.Stop(ctx)
}
