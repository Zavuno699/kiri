package service

import (
	"context"
	"encoding/json"
	"errors"
	"strings"

	"github.com/google/uuid"

	"github.com/kirilock/backend/device-service/internal/repository"
	"github.com/kirilock/backend/shared/events"
	"github.com/kirilock/backend/shared/kafka"
)

type KafkaDeviceOutboxPublisher struct {
	producer kafka.Producer
}

func NewKafkaDeviceOutboxPublisher(
	producer kafka.Producer,
) (*KafkaDeviceOutboxPublisher, error) {
	if producer == nil {
		return nil, errors.New("kafka producer is required")
	}

	return &KafkaDeviceOutboxPublisher{
		producer: producer,
	}, nil
}

func (p *KafkaDeviceOutboxPublisher) Publish(
	ctx context.Context,
	event repository.DeviceOutboxEvent,
) error {
	if p == nil {
		return errors.New("kafka device outbox publisher is required")
	}

	if ctx == nil {
		return errors.New("context is required")
	}

	if err := event.Validate(); err != nil {
		return err
	}

	if err := parseEventID(event.EventID.String()); err != nil {
		return err
	}

	topic, err := deviceEventTopic(event.EventType)
	if err != nil {
		return err
	}

	envelope := events.EventEnvelope{
		Metadata: events.EventMetadata{
			EventID:       event.EventID.String(),
			EventType:     event.EventType,
			EventVersion:  event.EventVersion,
			OccurredAt:    event.CreatedAt.UTC(),
			CorrelationID: event.CorrelationID,
			CausationID:   event.CausationID,
			Producer:      event.Producer,
		},
		Payload: event.Payload,
	}

	body, err := json.Marshal(envelope)
	if err != nil {
		return err
	}

	if strings.TrimSpace(string(body)) == "" {
		return errors.New("serialized event envelope is empty")
	}

	return p.producer.Publish(ctx, kafka.Message{
		Topic: topic,
		Key:   []byte(event.AggregateID.String()),
		Value: body,
	})
}

func deviceEventTopic(eventType string) (string, error) {
	switch eventType {
	case EventDeviceHeartbeat:
		return kafka.TopicDeviceHeartbeat, nil

	case EventDeviceConnectivityChanged:
		return kafka.TopicDeviceConnectivityChanged, nil

	default:
		return "", errors.New("unsupported device event type: " + eventType)
	}
}

func parseEventID(value string) error {
	if strings.TrimSpace(value) == "" {
		return errors.New("event ID is required")
	}

	if _, err := uuid.Parse(value); err != nil {
		return errors.New("event ID must be a valid UUID")
	}

	return nil
}
