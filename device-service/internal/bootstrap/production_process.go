package bootstrap

import "context"

type ProductionProcess struct {
	Lifecycle *ProductionLifecycle
}

func NewProductionProcess(
	lifecycle *ProductionLifecycle,
) *ProductionProcess {
	return &ProductionProcess{
		Lifecycle: lifecycle,
	}
}

func (p *ProductionProcess) Run(ctx context.Context) error {
	if p == nil || p.Lifecycle == nil {
		return nil
	}

	if err := p.Lifecycle.Start(ctx); err != nil {
		return WrapBootstrapError(
			ErrorClassRuntime,
			err,
		)
	}

	<-ctx.Done()

	if err := p.Lifecycle.Stop(ctx); err != nil {
		return WrapBootstrapError(
			ErrorClassShutdown,
			err,
		)
	}

	return nil
}
