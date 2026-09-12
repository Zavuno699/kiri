package service

import "context"

type DeviceProductionServiceLifecycle struct {
	Graph *DeviceProductionServiceGraph
}

func NewDeviceProductionServiceLifecycle(
	graph *DeviceProductionServiceGraph,
) *DeviceProductionServiceLifecycle {
	return &DeviceProductionServiceLifecycle{
		Graph: graph,
	}
}

func (l *DeviceProductionServiceLifecycle) Start(
	ctx context.Context,
) error {
	return l.Graph.Start(ctx)
}

func (l *DeviceProductionServiceLifecycle) Stop(
	ctx context.Context,
) error {
	return l.Graph.Stop(ctx)
}
