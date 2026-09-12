package service

import "context"

type DeviceProductionBootstrapGraph struct {
	Settings *DeviceProductionSettings
	Runtime  *DeviceProductionProcessRuntime
	Process  *DeviceProductionProcess
}

func NewDeviceProductionBootstrapGraph(
	settings *DeviceProductionSettings,
	runtime *DeviceProductionProcessRuntime,
	process *DeviceProductionProcess,
) *DeviceProductionBootstrapGraph {
	return &DeviceProductionBootstrapGraph{
		Settings: settings,
		Runtime:  runtime,
		Process:  process,
	}
}

func (g *DeviceProductionBootstrapGraph) Start(
	ctx context.Context,
) error {
	return g.Process.Start(ctx)
}

func (g *DeviceProductionBootstrapGraph) Stop(
	ctx context.Context,
) error {
	return g.Process.Stop(ctx)
}
