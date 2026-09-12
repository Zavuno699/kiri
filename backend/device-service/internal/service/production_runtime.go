package service

import "context"

type DeviceProductionRuntime struct {
	Dependencies *DeviceServiceDependencies
}

func NewDeviceProductionRuntime(
	dependencies *DeviceServiceDependencies,
) *DeviceProductionRuntime {
	return &DeviceProductionRuntime{
		Dependencies: dependencies,
	}
}

func (r *DeviceProductionRuntime) Start(
	context.Context,
) error {
	return nil
}

func (r *DeviceProductionRuntime) Stop(
	context.Context,
) error {
	return nil
}
