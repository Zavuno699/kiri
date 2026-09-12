package service

import "context"

type DeviceFinalApplicationGraph struct {
	HTTP       *DeviceFinalHTTPComposition
	Core       *DeviceServiceCoreIntegrationFacade
	Worker     *DeviceWorkerApplication
	Production *DeviceProductionServiceOwner
}

func NewDeviceFinalApplicationGraph(
	httpComposition *DeviceFinalHTTPComposition,
	core *DeviceServiceCoreIntegrationFacade,
	worker *DeviceWorkerApplication,
	production *DeviceProductionServiceOwner,
) *DeviceFinalApplicationGraph {
	return &DeviceFinalApplicationGraph{
		HTTP:       httpComposition,
		Core:       core,
		Worker:     worker,
		Production: production,
	}
}

func (g *DeviceFinalApplicationGraph) Start(
	ctx context.Context,
) error {
	if err := g.Core.Start(ctx); err != nil {
		return err
	}

	if err := g.Worker.Start(ctx); err != nil {
		_ = g.Core.Stop(context.Background())
		return err
	}

	return nil
}

func (g *DeviceFinalApplicationGraph) Stop(
	ctx context.Context,
) error {
	if err := g.Worker.Stop(ctx); err != nil {
		return err
	}

	return g.Core.Stop(ctx)
}
