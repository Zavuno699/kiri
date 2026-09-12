package bootstrap

import (
	"context"
	"errors"

	"github.com/kirilock/backend/device-service/internal/messaging"
)

type MessagingRuntimeOwner struct {
	Runtime  *messaging.Runtime
	Consumer *messaging.RuntimeConsumerOwner
}

func NewMessagingRuntimeOwner(
	runtime *messaging.Runtime,
	router *messaging.EventRouter,
) (*MessagingRuntimeOwner, error) {
	consumer, err := messaging.NewRuntimeConsumerOwnerForRuntime(
		runtime,
		router,
	)
	if err != nil {
		return nil, err
	}

	return &MessagingRuntimeOwner{
		Runtime:  runtime,
		Consumer: consumer,
	}, nil
}

func (m *MessagingRuntimeOwner) Start(
	ctx context.Context,
) error {
	if m == nil {
		return errors.New("messaging runtime owner is required")
	}

	if m.Runtime == nil {
		return errors.New("messaging runtime is required")
	}

	if m.Consumer == nil {
		return errors.New("messaging runtime consumer is required")
	}

	if ctx == nil {
		return errors.New("context is required")
	}

	return m.Consumer.Start(ctx)
}

func (m *MessagingRuntimeOwner) Stop(
	ctx context.Context,
) error {
	if m == nil {
		return nil
	}

	if m.Consumer == nil {
		return nil
	}

	return m.Consumer.Stop(ctx)
}

func (m *MessagingRuntimeOwner) Ready() bool {
	if m == nil || m.Consumer == nil {
		return false
	}

	return m.Consumer.Ready()
}
