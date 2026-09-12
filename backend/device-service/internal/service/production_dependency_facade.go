package service

import "context"

type DeviceProductionDependencyFacade struct {
	Application *DeviceProductionDependencyApplication
}

func NewDeviceProductionDependencyFacade(
	application *DeviceProductionDependencyApplication,
) *DeviceProductionDependencyFacade {
	return &DeviceProductionDependencyFacade{
		Application: application,
	}
}

func (f *DeviceProductionDependencyFacade) Start(
	ctx context.Context,
) error {
	return f.Application.Start(ctx)
}

func (f *DeviceProductionDependencyFacade) Stop(
	ctx context.Context,
) error {
	return f.Application.Stop(ctx)
}
