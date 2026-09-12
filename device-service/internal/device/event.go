package device

import "context"

type EventSink interface {
	Publish(context.Context, Event) error
}

type EventPublisher struct {
	Sink EventSink
}

func NewEventPublisher(
	sink EventSink,
) *EventPublisher {
	return &EventPublisher{
		Sink: sink,
	}
}

func (p *EventPublisher) Publish(
	ctx context.Context,
	event Event,
) error {
	return p.Sink.Publish(ctx, event)
}
