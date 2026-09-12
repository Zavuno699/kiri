package device

import "context"

type ProductionRuntime struct {
	Lifecycle *RuntimeLifecycle
	Commands  *RuntimeCommandService
	Health    *RuntimeHealthProvider
}

func NewProductionRuntime(
	lifecycle *RuntimeLifecycle,
	commands *RuntimeCommandService,
	health *RuntimeHealthProvider,
) *ProductionRuntime {
	return &ProductionRuntime{
		Lifecycle: lifecycle,
		Commands:  commands,
		Health:    health,
	}
}

func (r *ProductionRuntime) Start(
	ctx context.Context,
) error {
	return r.Lifecycle.Start(ctx)
}

func (r *ProductionRuntime) Stop(
	ctx context.Context,
) error {
	return r.Lifecycle.Stop(ctx)
}
