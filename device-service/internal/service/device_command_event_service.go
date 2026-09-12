package service

import "context"

type DeviceCommandEventService struct {
	Events *DeviceEventService
}

func NewDeviceCommandEventService(
	events *DeviceEventService,
) *DeviceCommandEventService {
	return &DeviceCommandEventService{
		Events: events,
	}
}

func (s *DeviceCommandEventService) Completed(
	ctx context.Context,
	deviceID string,
	payload []byte,
) error {
	return s.Events.Publish(
		ctx,
		DeviceServiceMessage{
			Topic:   "device.command.completed",
			Key:     deviceID,
			Payload: payload,
		},
	)
}

func (s *DeviceCommandEventService) Failed(
	ctx context.Context,
	deviceID string,
	payload []byte,
) error {
	return s.Events.Publish(
		ctx,
		DeviceServiceMessage{
			Topic:   "device.command.failed",
			Key:     deviceID,
			Payload: payload,
		},
	)
}
