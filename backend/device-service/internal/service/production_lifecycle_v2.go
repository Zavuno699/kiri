package service

import "context"

type ProductionLifecycleV2 struct {
	Components *ProductionComponents
}

func NewProductionLifecycleV2(
	components *ProductionComponents,
) *ProductionLifecycleV2 {
	return &ProductionLifecycleV2{
		Components: components,
	}
}

func (l *ProductionLifecycleV2) Start(
	ctx context.Context,
) error {
	if err := l.Components.Worker.Start(ctx); err != nil {
		return err
	}

	if err := l.Components.IntegrationsRuntime().Start(ctx); err != nil {
		_ = l.Components.Worker.Stop(context.Background())
		return err
	}

	if err := l.Components.API.Runtime.Start(ctx); err != nil {
		_ = l.Components.IntegrationsRuntime().Stop(context.Background())
		_ = l.Components.Worker.Stop(context.Background())
		return err
	}

	return nil
}

func (l *ProductionLifecycleV2) Stop(
	ctx context.Context,
) error {
	if err := l.Components.API.Runtime.Stop(ctx); err != nil {
		return err
	}

	if err := l.Components.IntegrationsRuntime().Stop(ctx); err != nil {
		return err
	}

	return l.Components.Worker.Stop(ctx)
}
