package repository

import (
	"context"
	"encoding/json"
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"
)

var (
	ErrOutboxEventNotFound = errors.New("outbox event not found")
	ErrOutboxEventConflict = errors.New("outbox event version conflict")
)

type DeviceOutboxEvent struct {
	ID            uuid.UUID
	EventID       uuid.UUID
	EventType     string
	EventVersion  int
	AggregateID   uuid.UUID
	CorrelationID string
	CausationID   string
	Producer      string
	Payload       json.RawMessage

	Status      string
	Attempts    int
	AvailableAt time.Time
	LockedAt    *time.Time
	PublishedAt *time.Time
	LastError   string

	CreatedAt time.Time
	UpdatedAt time.Time
	Version   int
}

func (e DeviceOutboxEvent) Validate() error {
	if e.ID == uuid.Nil {
		return errors.New("outbox ID is required")
	}
	if e.EventID == uuid.Nil {
		return errors.New("event ID is required")
	}
	if strings.TrimSpace(e.EventType) == "" {
		return errors.New("event type is required")
	}
	if e.EventVersion < 1 {
		return errors.New("event version must be at least 1")
	}
	if e.AggregateID == uuid.Nil {
		return errors.New("aggregate ID is required")
	}
	if strings.TrimSpace(e.CorrelationID) == "" {
		return errors.New("correlation ID is required")
	}
	if strings.TrimSpace(e.Producer) == "" {
		return errors.New("producer is required")
	}
	if len(e.Payload) == 0 || !json.Valid(e.Payload) {
		return errors.New("payload must be valid JSON")
	}

	switch e.Status {
	case "PENDING", "PROCESSING", "PUBLISHED", "FAILED":
	default:
		return errors.New("invalid outbox status")
	}

	if e.Attempts < 0 {
		return errors.New("attempts cannot be negative")
	}
	if e.Version < 1 {
		return errors.New("version must be at least 1")
	}
	if e.CreatedAt.IsZero() {
		return errors.New("created_at is required")
	}
	if e.UpdatedAt.IsZero() {
		return errors.New("updated_at is required")
	}

	return nil
}

type DeviceOutboxRepository interface {
	Enqueue(context.Context, DeviceOutboxEvent) error
}

type SQLDeviceOutboxRepository struct {
	db DB
}

func NewSQLDeviceOutboxRepository(db DB) *SQLDeviceOutboxRepository {
	return &SQLDeviceOutboxRepository{db: db}
}

func (r *SQLDeviceOutboxRepository) Enqueue(
	ctx context.Context,
	event DeviceOutboxEvent,
) error {
	if ctx == nil {
		return errors.New("context is required")
	}

	if err := event.Validate(); err != nil {
		return err
	}

	_, err := r.db.Exec(
		ctx,
		`INSERT INTO device_event_outbox (
			id,
			event_id,
			event_type,
			event_version,
			aggregate_id,
			correlation_id,
			causation_id,
			producer,
			payload,
			status,
			attempts,
			available_at,
			locked_at,
			published_at,
			last_error,
			created_at,
			updated_at,
			version
		)
		VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8, $9,
			$10, $11, $12, $13, $14, $15, $16, $17, $18
		)
		ON CONFLICT (event_id) DO NOTHING`,
		event.ID,
		event.EventID,
		event.EventType,
		event.EventVersion,
		event.AggregateID,
		event.CorrelationID,
		nullIfEmpty(event.CausationID),
		event.Producer,
		event.Payload,
		event.Status,
		event.Attempts,
		event.AvailableAt,
		event.LockedAt,
		event.PublishedAt,
		nullIfEmpty(event.LastError),
		event.CreatedAt,
		event.UpdatedAt,
		event.Version,
	)
	if err != nil {
		return err
	}

	return nil
}

func nullIfEmpty(value string) any {
	if strings.TrimSpace(value) == "" {
		return nil
	}
	return value
}
