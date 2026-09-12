package service

import (
	"context"
	"encoding/json"
	"errors"

	"github.com/google/uuid"

	"github.com/kirilock/backend/shared/kafka"
)

type KafkaLeaseEventPublisher struct {
	producer kafka.Producer
}

func NewKafkaLeaseEventPublisher(
	producer kafka.Producer,
) (*KafkaLeaseEventPublisher, error) {
	if producer == nil {
		return nil, errors.New("Kafka producer is required")
	}

	return &KafkaLeaseEventPublisher{
		producer: producer,
	}, nil
}

func (p *KafkaLeaseEventPublisher) PublishLeaseCreated(
	ctx context.Context,
	event LeaseCreatedEvent,
) error {
	return p.publish(ctx, EventLeaseCreated, event.LeaseID, event)
}

func (p *KafkaLeaseEventPublisher) PublishLeaseEntitlementChanged(
	ctx context.Context,
	event LeaseEntitlementChangedEvent,
) error {
	return p.publish(
		ctx,
		EventLeaseEntitlementChanged,
		event.LeaseID,
		event,
	)
}

func (p *KafkaLeaseEventPublisher) PublishLeaseStatusChanged(
	ctx context.Context,
	event LeaseStatusChangedEvent,
) error {
	return p.publish(
		ctx,
		EventLeaseStatusChanged,
		event.LeaseID,
		event,
	)
}

func (p *KafkaLeaseEventPublisher) publish(
	ctx context.Context,
	eventType string,
	leaseID uuid.UUID,
	data any,
) error {
	if p == nil || p.producer == nil {
		return errors.New("Kafka producer is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if leaseID == uuid.Nil {
		return errors.New("lease ID is required")
	}

	eventEnvelope, err := NewLeaseEvent(
		eventType,
		leaseID.String(),
		"",
		data,
	)
	if err != nil {
		return err
	}

	payload, err := MarshalLeaseEvent(eventEnvelope)
	if err != nil {
		return err
	}

	return p.producer.Publish(ctx, kafka.Message{
		Topic:     kafka.TopicLeaseLifecycleEvents,
		Key:       []byte(leaseID.String()),
		Value:     payload,
		EventID:   eventEnvelope.Metadata.EventID,
		EventType: eventType,
	})
}

func MarshalLeaseEventData(data any) ([]byte, error) {
	if data == nil {
		return nil, errors.New("event data is required")
	}

	return json.Marshal(data)
}
