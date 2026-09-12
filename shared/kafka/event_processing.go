package kafka

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
)

type EventProcessingStatus string

const (
	EventProcessingStarted   EventProcessingStatus = "PROCESSING"
	EventProcessingCompleted EventProcessingStatus = "COMPLETED"
)

type EventProcessingRecord struct {
	ConsumerName  string
	EventID       uuid.UUID
	EventType     string
	Status        EventProcessingStatus
	CorrelationID *uuid.UUID
	OccurredAt    time.Time
	StartedAt     time.Time
	CompletedAt   *time.Time
	Version       int64
}

func (r EventProcessingRecord) Validate() error {
	if r.ConsumerName == "" {
		return errors.New("consumer name is required")
	}
	if r.EventID == uuid.Nil {
		return errors.New("event ID is required")
	}
	if r.EventType == "" {
		return errors.New("event type is required")
	}
	if r.Status != EventProcessingStarted &&
		r.Status != EventProcessingCompleted {
		return errors.New("invalid event processing status")
	}
	if r.OccurredAt.IsZero() {
		return errors.New("occurred_at is required")
	}
	if r.StartedAt.IsZero() {
		return errors.New("started_at is required")
	}
	if r.Version < 1 {
		return errors.New("event processing version must be positive")
	}
	if r.Status == EventProcessingCompleted && r.CompletedAt == nil {
		return errors.New("completed_at is required for completed events")
	}

	return nil
}

type EventProcessingRepository interface {
	Claim(
		ctx context.Context,
		record EventProcessingRecord,
	) (claimed bool, err error)

	Complete(
		ctx context.Context,
		consumerName string,
		eventID uuid.UUID,
		completedAt time.Time,
	) error

	Release(
		ctx context.Context,
		consumerName string,
		eventID uuid.UUID,
	) error
}
