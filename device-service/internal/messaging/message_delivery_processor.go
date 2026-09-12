package messaging

import (
	"context"
	"errors"
)

type MessageDeliveryProcessor struct {
	Policy      DeliveryPolicy
	Coordinator *DeliveryCoordinator
	Adapter     *MessageEventAdapter
	Router      *EventRouter
}

func NewMessageDeliveryProcessor(
	policy DeliveryPolicy,
	coordinator *DeliveryCoordinator,
	adapter *MessageEventAdapter,
	router *EventRouter,
) *MessageDeliveryProcessor {
	return &MessageDeliveryProcessor{
		Policy:      policy,
		Coordinator: coordinator,
		Adapter:     adapter,
		Router:      router,
	}
}

func (p *MessageDeliveryProcessor) Process(
	ctx context.Context,
	message Message,
	attempt int,
) ProcessingResult {
	if p == nil {
		return NewProcessingResult(
			EventEnvelope{},
			message.Topic,
			attempt,
			RejectDecision(),
		)
	}

	if ctx == nil {
		return NewProcessingResult(
			EventEnvelope{},
			message.Topic,
			attempt,
			RejectDecision(),
		)
	}

	if p.Adapter == nil {
		result := NewProcessingResult(
			EventEnvelope{},
			message.Topic,
			attempt,
			RejectDecision(),
		)
		result.ErrorMessage = errors.New(
			"message event adapter is required",
		).Error()
		return result
	}

	if p.Router == nil {
		result := NewProcessingResult(
			EventEnvelope{},
			message.Topic,
			attempt,
			RejectDecision(),
		)
		result.ErrorMessage = errors.New(
			"event router is required",
		).Error()
		return result
	}

	event, err := p.Adapter.Decode(message)
	if err != nil {
		decision := DecideDelivery(
			p.Policy,
			attempt,
			err,
		)

		return NewProcessingResult(
			event,
			message.Topic,
			attempt,
			decision,
		)
	}

	process := func(inner context.Context) error {
		return p.Router.Handle(inner, event)
	}

	if p.Coordinator != nil {
		err = p.Coordinator.Execute(
			ctx,
			event.EventID,
			process,
		)
	} else {
		err = process(ctx)
	}

	decision := DecideDelivery(
		p.Policy,
		attempt,
		err,
	)

	result := NewProcessingResult(
		event,
		message.Topic,
		attempt,
		decision,
	)

	if err != nil {
		result.ErrorMessage = err.Error()
	}

	return result
}
