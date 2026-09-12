package service

import "context"

type DeviceProductionApplication struct {
	Graph *DeviceProductionBootstrapGraph
}

func NewDeviceProductionApplication(
	graph *DeviceProductionBootstrapGraph,
) *DeviceProductionApplication {
	return &DeviceProductionApplication{
		Graph: graph,
	}
}

func (a *DeviceProductionApplication) Start(
	ctx context.Context,
) error {
	return a.Graph.Start(ctx)
}

func (a *DeviceProductionApplication) Stop(
	ctx context.Context,
) error {
	return a.Graph.Stop(ctx)
}
