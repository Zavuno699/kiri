package service

import "context"

type DeviceFinalApplication struct {
	Graph *DeviceFinalApplicationGraph
}

func NewDeviceFinalApplication(
	graph *DeviceFinalApplicationGraph,
) *DeviceFinalApplication {
	return &DeviceFinalApplication{
		Graph: graph,
	}
}

func (a *DeviceFinalApplication) Start(
	ctx context.Context,
) error {
	return a.Graph.Start(ctx)
}

func (a *DeviceFinalApplication) Stop(
	ctx context.Context,
) error {
	return a.Graph.Stop(ctx)
}
