package service

import (
	"encoding/json"
	"errors"
	"time"

	"github.com/google/uuid"

	sharedEvents "github.com/kirilock/backend/shared/events"
)

type LeaseEvent struct {
	Metadata sharedEvents.EventMetadata `json:"metadata"`
	Data     any                        `json:"data"`
}

func NewLeaseEvent(
	eventType string,
	correlationID string,
	causationID string,
	data any,
) (LeaseEvent, error) {
	if eventType == "" {
		return LeaseEvent{}, errors.New("event type is required")
	}
	if correlationID == "" {
		return LeaseEvent{}, errors.New("correlation ID is required")
	}
	if data == nil {
		return LeaseEvent{}, errors.New("event data is required")
	}

	return LeaseEvent{
		Metadata: sharedEvents.EventMetadata{
			EventID:       uuid.NewString(),
			EventType:     eventType,
			EventVersion:  1,
			OccurredAt:    time.Now().UTC(),
			CorrelationID: correlationID,
			CausationID:   causationID,
			Producer:      "lease-service",
		},
		Data: data,
	}, nil
}

func MarshalLeaseEvent(event LeaseEvent) ([]byte, error) {
	if event.Metadata.EventID == "" {
		return nil, errors.New("event ID is required")
	}
	if event.Metadata.EventType == "" {
		return nil, errors.New("event type is required")
	}
	if event.Metadata.EventVersion < 1 {
		return nil, errors.New("event version must be positive")
	}
	if event.Metadata.CorrelationID == "" {
		return nil, errors.New("correlation ID is required")
	}
	if event.Metadata.Producer == "" {
		return nil, errors.New("event producer is required")
	}
	if event.Data == nil {
		return nil, errors.New("event data is required")
	}

	return json.Marshal(event)
}
