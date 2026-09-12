package messaging

import "context"

type EventHandler struct {
	Repository interface {
		Append(context.Context, serviceMessage) error
	}
}

type serviceMessage struct {
	Topic   string
	Key     string
	Payload []byte
}

func NewEventHandler() *EventHandler {
	return &EventHandler{}
}

func (h *EventHandler) Handle(
	context.Context,
	Message,
) error {
	return nil
}
