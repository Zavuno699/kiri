package kafka

import (
	"context"
	"errors"
)

type ConsumerMessage struct {
	Topic     string
	Partition int
	Offset    int64
	Key       []byte
	Value     []byte
	EventID   string
	EventType string
}

func (m ConsumerMessage) Validate() error {
	if m.Topic == "" {
		return errors.New("Kafka topic is required")
	}
	if len(m.Value) == 0 {
		return errors.New("Kafka message value is required")
	}
	if m.EventID == "" {
		return errors.New("Kafka event ID is required")
	}
	if m.EventType == "" {
		return errors.New("Kafka event type is required")
	}

	return nil
}

type MessageHandler interface {
	Handle(context.Context, ConsumerMessage) error
}

type Consumer interface {
	Consume(context.Context, MessageHandler) error
	Close() error
}
