package service

import "context"

type DeviceServiceRuntimeFacade struct {
	Graph *DeviceServiceFinalRuntimeGraph
}

func NewDeviceServiceRuntimeFacade(
	graph *DeviceServiceFinalRuntimeGraph,
) *DeviceServiceRuntimeFacade {
	return &DeviceServiceRuntimeFacade{
		Graph: graph,
	}
}

func (f *DeviceServiceRuntimeFacade) Start(
	ctx context.Context,
) error {
	return f.Graph.Start(ctx)
}

func (f *DeviceServiceRuntimeFacade) Stop(
	ctx context.Context,
) error {
	return f.Graph.Stop(ctx)
}
