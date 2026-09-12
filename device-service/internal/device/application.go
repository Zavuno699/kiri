package device

import "context"

type Application struct {
	Runtime *DeviceRuntimeService
	Config  Config
}

func NewApplication(
	runtime *DeviceRuntimeService,
	config Config,
) *Application {
	return &Application{
		Runtime: runtime,
		Config:  config,
	}
}

func (a *Application) Start(
	ctx context.Context,
) error {
	return a.Runtime.Start(
		ctx,
		a.Config.DeviceID,
		a.Config,
	)
}

func (a *Application) Stop(
	ctx context.Context,
) error {
	return a.Runtime.Stop(
		ctx,
		a.Config.DeviceID,
	)
}
