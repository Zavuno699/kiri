package messaging

import (
	"context"
	"errors"

	"github.com/kirilock/backend/device-service/internal/service"
)

type DeviceMessageBus struct {
	Broker *Broker
}

func NewDeviceMessageBus(
	broker *Broker,
) *DeviceMessageBus {
	return &DeviceMessageBus{
		Broker: broker,
	}
}

func (b *DeviceMessageBus) Publish(
	ctx context.Context,
	message service.DeviceServiceMessage,
) error {
	if b == nil {
		return errors.New("device message bus is required")
	}
	if b.Broker == nil {
		return errors.New("device message broker is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if message.Topic == "" {
		return errors.New("message topic is required")
	}
	if message.Key == "" {
		return errors.New("message key is required")
	}

	return b.Broker.Publish(
		ctx,
		Message{
			Topic: message.Topic,
			Key:   []byte(message.Key),
			Value: message.Payload,
		},
	)
}

func (b *DeviceMessageBus) Close(
	ctx context.Context,
) error {
	if b == nil {
		return errors.New("device message bus is required")
	}
	if b.Broker == nil {
		return errors.New("device message broker is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}

	return b.Broker.Stop(ctx)
}
