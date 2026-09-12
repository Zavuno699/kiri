package service

import "context"

type DeviceServiceFinalRuntimeGraph struct {
	Runtime *DeviceServiceSystemRuntime
}

func NewDeviceServiceFinalRuntimeGraph(
	runtime *DeviceServiceSystemRuntime,
) *DeviceServiceFinalRuntimeGraph {
	return &DeviceServiceFinalRuntimeGraph{
		Runtime: runtime,
	}
}

func (g *DeviceServiceFinalRuntimeGraph) Start(
	ctx context.Context,
) error {
	return g.Runtime.Start(ctx)
}

func (g *DeviceServiceFinalRuntimeGraph) Stop(
	ctx context.Context,
) error {
	return g.Runtime.Stop(ctx)
}
