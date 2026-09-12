package service

import "context"

type DeviceProductionRuntimeLifecycle struct {
	Graph *DeviceProductionRuntimeGraph
}

func NewDeviceProductionRuntimeLifecycle(
	graph *DeviceProductionRuntimeGraph,
) *DeviceProductionRuntimeLifecycle {
	return &DeviceProductionRuntimeLifecycle{
		Graph: graph,
	}
}

func (l *DeviceProductionRuntimeLifecycle) Start(
	ctx context.Context,
) error {
	if err := l.Graph.HTTP.Start(ctx); err != nil {
		return err
	}

	if err := l.Graph.Core.Start(ctx); err != nil {
		_ = l.Graph.HTTP.Stop(context.Background())
		return err
	}

	return nil
}

func (l *DeviceProductionRuntimeLifecycle) Stop(
	ctx context.Context,
) error {
	coreErr := l.Graph.Core.Stop(ctx)
	httpErr := l.Graph.HTTP.Stop(ctx)

	if coreErr != nil {
		return &DeviceServiceShutdownError{
			Component: "core",
			Err:       coreErr,
		}
	}

	if httpErr != nil {
		return httpErr
	}

	return nil
}
