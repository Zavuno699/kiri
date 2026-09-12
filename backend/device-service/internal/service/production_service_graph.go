package service

import "context"

type DeviceProductionServiceGraph struct {
	Dependencies *DeviceServiceDependencies
	Core         *DeviceServiceCoreIntegrations
	Integration  *DeviceServiceIntegrationRuntime
	Application  *DeviceServiceCoreApplication
}

func NewDeviceProductionServiceGraph(
	dependencies *DeviceServiceDependencies,
	core *DeviceServiceCoreIntegrations,
	integration *DeviceServiceIntegrationRuntime,
	application *DeviceServiceCoreApplication,
) *DeviceProductionServiceGraph {
	return &DeviceProductionServiceGraph{
		Dependencies: dependencies,
		Core:         core,
		Integration:  integration,
		Application:  application,
	}
}

func (g *DeviceProductionServiceGraph) Start(
	ctx context.Context,
) error {
	return g.Application.Start(ctx)
}

func (g *DeviceProductionServiceGraph) Stop(
	ctx context.Context,
) error {
	return g.Application.Stop(ctx)
}
