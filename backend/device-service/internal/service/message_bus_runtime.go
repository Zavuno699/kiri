package service

import "context"

type MessageBusRuntime struct {
	Integration *MessageBusIntegration
}

func NewMessageBusRuntime(
	integration *MessageBusIntegration,
) *MessageBusRuntime {
	return &MessageBusRuntime{
		Integration: integration,
	}
}

func (r *MessageBusRuntime) Publish(
	ctx context.Context,
	message DeviceServiceMessage,
) error {
	return r.Integration.Publish(ctx, message)
}

func (r *MessageBusRuntime) Stop(
	ctx context.Context,
) error {
	return r.Integration.Stop(ctx)
}
