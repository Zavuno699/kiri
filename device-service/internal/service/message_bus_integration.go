package service

import (
	"context"
	"errors"
)

type MessageBusIntegration struct {
	Bus DeviceServiceMessageBus
}

func NewMessageBusIntegration(
	bus DeviceServiceMessageBus,
) *MessageBusIntegration {
	return &MessageBusIntegration{
		Bus: bus,
	}
}

func (m *MessageBusIntegration) Publish(
	ctx context.Context,
	message DeviceServiceMessage,
) error {
	if m == nil {
		return errors.New("message bus integration is required")
	}
	if m.Bus == nil {
		return errors.New("message bus is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}

	return m.Bus.Publish(ctx, message)
}

func (m *MessageBusIntegration) Stop(
	ctx context.Context,
) error {
	if m == nil {
		return errors.New("message bus integration is required")
	}
	if m.Bus == nil {
		return errors.New("message bus is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}

	return m.Bus.Close(ctx)
}
