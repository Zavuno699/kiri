package service

import "context"

type DeviceServiceIntegrationRuntime struct {
	Database   *DatabaseIntegration
	MessageBus *MessageBusIntegration
	Transport  *DeviceTransportIntegration
	Repository *RepositoryIntegration
}

func NewDeviceServiceIntegrationRuntime(
	database *DatabaseIntegration,
	messageBus *MessageBusIntegration,
	transport *DeviceTransportIntegration,
	repository *RepositoryIntegration,
) *DeviceServiceIntegrationRuntime {
	return &DeviceServiceIntegrationRuntime{
		Database:   database,
		MessageBus: messageBus,
		Transport:  transport,
		Repository: repository,
	}
}

func (r *DeviceServiceIntegrationRuntime) Start(
	ctx context.Context,
) error {
	if err := r.Database.Start(ctx); err != nil {
		return err
	}

	return nil
}

func (r *DeviceServiceIntegrationRuntime) Stop(
	ctx context.Context,
) error {
	if err := r.Transport.Stop(ctx); err != nil {
		return err
	}

	if err := r.MessageBus.Stop(ctx); err != nil {
		return err
	}

	return r.Database.Stop(ctx)
}
