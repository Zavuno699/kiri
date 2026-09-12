package device

import "context"

type RuntimeLifecycle struct {
	Runtime *DeviceRuntimeService
	Events  *RuntimeEvents
	Config  Config
}

func NewRuntimeLifecycle(
	runtime *DeviceRuntimeService,
	events *RuntimeEvents,
	config Config,
) *RuntimeLifecycle {
	return &RuntimeLifecycle{
		Runtime: runtime,
		Events:  events,
		Config:  config,
	}
}

func (l *RuntimeLifecycle) Start(
	ctx context.Context,
) error {
	if err := l.Runtime.Start(
		ctx,
		l.Config.DeviceID,
		l.Config,
	); err != nil {
		return err
	}

	return l.Events.Connected(ctx)
}

func (l *RuntimeLifecycle) Stop(
	ctx context.Context,
) error {
	err := l.Runtime.Stop(
		ctx,
		l.Config.DeviceID,
	)

	eventErr := l.Events.Disconnected(ctx)

	if err != nil {
		return err
	}

	return eventErr
}
