package service

import (
	"context"
	"encoding/json"
	"errors"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/shared/events"
	"github.com/kirilock/backend/shared/kafka"
)

type DeviceEventPublisher interface {
	PublishHeartbeat(context.Context, DeviceHeartbeatEvent, string) error
	PublishConnectivityChanged(context.Context, DeviceConnectivityChangedEvent, string) error
}

type KafkaDeviceEventPublisher struct {
	producer kafka.Producer
}

func NewKafkaDeviceEventPublisher(
	producer kafka.Producer,
) (*KafkaDeviceEventPublisher, error) {
	if producer == nil {
		return nil, errors.New("kafka producer is required")
	}

	return &KafkaDeviceEventPublisher{
		producer: producer,
	}, nil
}

func (p *KafkaDeviceEventPublisher) PublishHeartbeat(
	ctx context.Context,
	event DeviceHeartbeatEvent,
	correlationID string,
) error {
	if ctx == nil {
		return errors.New("context is required")
	}

	if err := event.Validate(); err != nil {
		return err
	}

	return p.publish(
		ctx,
		kafka.TopicDeviceHeartbeat,
		event.DeviceID,
		EventDeviceHeartbeat,
		event.EventVersion,
		event.ObservedAt,
		correlationID,
		event,
	)
}

func (p *KafkaDeviceEventPublisher) PublishConnectivityChanged(
	ctx context.Context,
	event DeviceConnectivityChangedEvent,
	correlationID string,
) error {
	if ctx == nil {
		return errors.New("context is required")
	}

	if err := event.Validate(); err != nil {
		return err
	}

	return p.publish(
		ctx,
		kafka.TopicDeviceConnectivityChanged,
		event.DeviceID,
		EventDeviceConnectivityChanged,
		event.EventVersion,
		event.EvaluatedAt,
		correlationID,
		event,
	)
}

func (p *KafkaDeviceEventPublisher) publish(
	ctx context.Context,
	topic string,
	key uuid.UUID,
	eventType string,
	eventVersion int,
	occurredAt time.Time,
	correlationID string,
	payload any,
) error {
	if correlationID == "" {
		return errors.New("correlation ID is required")
	}

	if occurredAt.IsZero() {
		return errors.New("event timestamp is required")
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	eventID := uuid.New()

	envelope := events.EventEnvelope{
		Metadata: events.EventMetadata{
			EventID:       eventID.String(),
			EventType:     eventType,
			EventVersion:  eventVersion,
			OccurredAt:    occurredAt.UTC(),
			CorrelationID: correlationID,
			Producer:      "device-service",
		},
		Payload: body,
	}

	envelopeBody, err := json.Marshal(envelope)
	if err != nil {
		return err
	}

	return p.producer.Publish(ctx, kafka.Message{
		Topic: topic,
		Key:   []byte(key.String()),
		Value: envelopeBody,
	})
}
