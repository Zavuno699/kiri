package messaging

import (
	"context"

	"github.com/kirilock/backend/device-service/internal/device"
	"github.com/kirilock/backend/device-service/internal/service"
)

type DeviceEventSink struct {
	Bus *DeviceMessageBus
}

func NewDeviceEventSink(
	bus *DeviceMessageBus,
) *DeviceEventSink {
	return &DeviceEventSink{
		Bus: bus,
	}
}

func (s *DeviceEventSink) Publish(
	ctx context.Context,
	event device.Event,
) error {
	return s.Bus.Publish(
		ctx,
		service.DeviceServiceMessage{
			Topic:   event.Type,
			Key:     event.DeviceID,
			Payload: event.Payload,
		},
	)
}
