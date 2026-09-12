package service

import "context"

type ProductionApplicationV2 struct {
	Lifecycle *ProductionLifecycleV2
}

func NewProductionApplicationV2(
	lifecycle *ProductionLifecycleV2,
) *ProductionApplicationV2 {
	return &ProductionApplicationV2{
		Lifecycle: lifecycle,
	}
}

func (a *ProductionApplicationV2) Run(
	ctx context.Context,
) error {
	return a.Lifecycle.Start(ctx)
}

func (a *ProductionApplicationV2) Stop(
	ctx context.Context,
) error {
	return a.Lifecycle.Stop(ctx)
}
