package service

import (
	"context"
	"encoding/json"
	"errors"

	"github.com/kirilock/backend/shared/kafka"
)

type LeaseLifecycleEventHandler func(
	context.Context,
	LeaseEvent,
) error

type LeaseLifecycleConsumer struct {
	handler LeaseLifecycleEventHandler
}

func NewLeaseLifecycleConsumer(
	handler LeaseLifecycleEventHandler,
) (*LeaseLifecycleConsumer, error) {
	if handler == nil {
		return nil, errors.New("lease lifecycle event handler is required")
	}

	return &LeaseLifecycleConsumer{
		handler: handler,
	}, nil
}

func (c *LeaseLifecycleConsumer) Handle(
	ctx context.Context,
	message kafka.ConsumerMessage,
) error {
	if c == nil {
		return errors.New("lease lifecycle consumer is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if err := message.Validate(); err != nil {
		return err
	}

	if message.Topic != kafka.TopicLeaseLifecycleEvents {
		return errors.New("unexpected Kafka topic for lease lifecycle event")
	}

	var event LeaseEvent
	if err := json.Unmarshal(message.Value, &event); err != nil {
		return errors.New("invalid lease lifecycle event: " + err.Error())
	}

	if event.Metadata.EventID == "" {
		return errors.New("lease event ID is required")
	}
	if event.Metadata.EventType == "" {
		return errors.New("lease event type is required")
	}
	if event.Metadata.EventVersion < 1 {
		return errors.New("lease event version must be positive")
	}
	if event.Metadata.OccurredAt.IsZero() {
		return errors.New("lease event occurred_at is required")
	}
	if event.Metadata.Producer == "" {
		return errors.New("lease event producer is required")
	}

	if event.Metadata.EventID != message.EventID {
		return errors.New("Kafka event ID does not match lease event")
	}
	if event.Metadata.EventType != message.EventType {
		return errors.New("Kafka event type does not match lease event")
	}

	return c.handler(ctx, event)
}
