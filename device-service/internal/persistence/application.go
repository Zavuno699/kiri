package persistence

import "context"

type Application struct {
	Runtime *Runtime
}

func NewApplication(
	runtime *Runtime,
) *Application {
	return &Application{
		Runtime: runtime,
	}
}

func (a *Application) Start(
	ctx context.Context,
) error {
	return a.Runtime.Start(ctx)
}

func (a *Application) Stop(
	ctx context.Context,
) error {
	return a.Runtime.Stop(ctx)
}
