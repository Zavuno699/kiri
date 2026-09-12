package service

import "context"

type DeviceProductionDependencyApplication struct {
	Graph *DeviceProductionDependencyGraph
}

func NewDeviceProductionDependencyApplication(
	graph *DeviceProductionDependencyGraph,
) *DeviceProductionDependencyApplication {
	return &DeviceProductionDependencyApplication{
		Graph: graph,
	}
}

func (a *DeviceProductionDependencyApplication) Start(
	ctx context.Context,
) error {
	return a.Graph.Owner.Start(ctx)
}

func (a *DeviceProductionDependencyApplication) Stop(
	ctx context.Context,
) error {
	return a.Graph.Owner.Stop(ctx)
}
