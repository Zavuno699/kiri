package service

import "context"

type DeviceIntegrationReadiness struct {
	Database   *DatabaseIntegration
	MessageBus *MessageBusIntegration
	Transport  *DeviceTransportIntegration
}

func NewDeviceIntegrationReadiness(
	database *DatabaseIntegration,
	messageBus *MessageBusIntegration,
	transport *DeviceTransportIntegration,
) *DeviceIntegrationReadiness {
	return &DeviceIntegrationReadiness{
		Database:   database,
		MessageBus: messageBus,
		Transport:  transport,
	}
}

func (r *DeviceIntegrationReadiness) Check(
	ctx context.Context,
) error {
	return r.Database.Start(ctx)
}
