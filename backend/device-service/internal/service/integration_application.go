package service

import "context"

type DeviceIntegrationApplication struct {
	Graph *DeviceIntegrationGraph
}

func NewDeviceIntegrationApplication(
	graph *DeviceIntegrationGraph,
) *DeviceIntegrationApplication {
	return &DeviceIntegrationApplication{
		Graph: graph,
	}
}

func (a *DeviceIntegrationApplication) Start(
	ctx context.Context,
) error {
	return a.Graph.Lifecycle.Start(ctx)
}

func (a *DeviceIntegrationApplication) Stop(
	ctx context.Context,
) error {
	return a.Graph.Lifecycle.Stop(ctx)
}
