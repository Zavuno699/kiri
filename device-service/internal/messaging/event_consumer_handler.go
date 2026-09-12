package messaging

import (
	"context"
	"errors"
)

type EventConsumerHandler struct {
	Service *ConsumerService
}

func NewEventConsumerHandler(
	service *ConsumerService,
) *EventConsumerHandler {
	return &EventConsumerHandler{
		Service: service,
	}
}

func (h *EventConsumerHandler) Handle(
	ctx context.Context,
	message Message,
) error {
	if h == nil {
		return errors.New("event consumer handler is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if h.Service == nil {
		return errors.New("consumer service is required")
	}

	return h.Service.Handle(ctx, message)
}
