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

type LockEventPublisher interface {
	PublishCommand(context.Context, LockCommandEvent) error
	PublishCommandResult(context.Context, LockCommandResultEvent) error
	PublishStateChanged(context.Context, LockStateChangedEvent) error
}

type KafkaLockEventPublisher struct {
	producer kafka.Producer
}

func NewKafkaLockEventPublisher(
	producer kafka.Producer,
) (*KafkaLockEventPublisher, error) {
	if producer == nil {
		return nil, errors.New("Kafka producer is required")
	}

	return &KafkaLockEventPublisher{
		producer: producer,
	}, nil
}

func (p *KafkaLockEventPublisher) PublishCommand(
	ctx context.Context,
	event LockCommandEvent,
) error {
	if err := event.Validate(); err != nil {
		return err
	}

	return p.publish(
		ctx,
		EventLockCommand,
		kafka.TopicLockCommand,
		event.CommandID,
		event.CorrelationID,
		event,
	)
}

func (p *KafkaLockEventPublisher) PublishCommandResult(
	ctx context.Context,
	event LockCommandResultEvent,
) error {
	if err := event.Validate(); err != nil {
		return err
	}

	return p.publish(
		ctx,
		EventLockCommandResult,
		kafka.TopicLockCommandResult,
		event.CommandID,
		event.CorrelationID,
		event,
	)
}

func (p *KafkaLockEventPublisher) PublishStateChanged(
	ctx context.Context,
	event LockStateChangedEvent,
) error {
	if err := event.Validate(); err != nil {
		return err
	}

	return p.publish(
		ctx,
		EventLockStateChanged,
		kafka.TopicLockStateChanged,
		event.LockID,
		event.CorrelationID,
		event,
	)
}

func (p *KafkaLockEventPublisher) publish(
	ctx context.Context,
	eventType string,
	topic string,
	keyID uuid.UUID,
	correlationID string,
	data any,
) error {
	if p == nil || p.producer == nil {
		return errors.New("Kafka producer is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}

	metadata := events.EventMetadata{
		EventID:       uuid.New().String(),
		EventType:     eventType,
		EventVersion:  1,
		OccurredAt:    nowUTC(),
		CorrelationID: correlationID,
		Producer:      "lock-service",
	}

	envelope := struct {
		Metadata events.EventMetadata `json:"metadata"`
		Data     any                  `json:"data"`
	}{
		Metadata: metadata,
		Data:     data,
	}

	payload, err := json.Marshal(envelope)
	if err != nil {
		return err
	}

	return p.producer.Publish(ctx, kafka.Message{
		Topic:     topic,
		Key:       []byte(keyID.String()),
		Value:     payload,
		EventID:   metadata.EventID,
		EventType: eventType,
	})
}

func nowUTC() (t time.Time) {
	return time.Now().UTC()
}
