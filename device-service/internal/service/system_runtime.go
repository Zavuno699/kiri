package service

import "context"

type DeviceSystemRuntime struct {
	Dependencies *DeviceSystemDependencies
}

func NewDeviceSystemRuntime(
	dependencies *DeviceSystemDependencies,
) *DeviceSystemRuntime {
	return &DeviceSystemRuntime{
		Dependencies: dependencies,
	}
}

func (r *DeviceSystemRuntime) Start(
	ctx context.Context,
) error {
	if err := r.Dependencies.Worker.Start(ctx); err != nil {
		return err
	}

	return nil
}

func (r *DeviceSystemRuntime) Stop(
	ctx context.Context,
) error {
	return r.Dependencies.Worker.Stop(ctx)
}
