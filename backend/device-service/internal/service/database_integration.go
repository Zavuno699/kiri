package service

import "context"

type DatabaseIntegration struct {
	Store DeviceServiceStore
}

func NewDatabaseIntegration(
	store DeviceServiceStore,
) *DatabaseIntegration {
	return &DatabaseIntegration{
		Store: store,
	}
}

func (d *DatabaseIntegration) Start(
	ctx context.Context,
) error {
	return d.Store.Ping(ctx)
}

func (d *DatabaseIntegration) Stop(
	ctx context.Context,
) error {
	return d.Store.Close(ctx)
}
