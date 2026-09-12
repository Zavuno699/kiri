package service

import "context"

type DeviceEventService struct {
	MessageBus MessageBusIntegration
	Events     DeviceServiceEventRepository
}

func NewDeviceEventService(
	messageBus MessageBusIntegration,
	events DeviceServiceEventRepository,
) *DeviceEventService {
	return &DeviceEventService{
		MessageBus: messageBus,
		Events:     events,
	}
}

func (s *DeviceEventService) Publish(
	ctx context.Context,
	message DeviceServiceMessage,
) error {
	if err := s.Events.Append(ctx, message); err != nil {
		return err
	}

	return s.MessageBus.Publish(ctx, message)
}
