package kafka

import (
	"context"
	"errors"
)

type Message struct {
	Topic     string
	Key       []byte
	Value     []byte
	EventID   string
	EventType string
}

func (m Message) Validate() error {
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

type Producer interface {
	Publish(ctx context.Context, message Message) error
	Close() error
}
