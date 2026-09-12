package messaging

import (
	"time"

	"github.com/google/uuid"
)

type EventEnvelope struct {
	EventID       string      `json:"event_id"`
	EventType     string      `json:"event_type"`
	EventVersion  int         `json:"event_version"`
	OccurredAt    time.Time   `json:"occurred_at"`
	CorrelationID string      `json:"correlation_id"`
	CausationID   string      `json:"causation_id"`
	Producer      string      `json:"producer"`
	AggregateID   string      `json:"aggregate_id"`
	AggregateType string      `json:"aggregate_type"`
	Data          interface{} `json:"data"`
}

func NewEventEnvelope(
	eventType string,
	producer string,
	aggregateType string,
	aggregateID string,
	data interface{},
) EventEnvelope {
	now := time.Now().UTC()

	return EventEnvelope{
		EventID:       uuid.NewString(),
		EventType:     eventType,
		EventVersion:  1,
		OccurredAt:    now,
		Producer:      producer,
		AggregateID:   aggregateID,
		AggregateType: aggregateType,
		Data:          data,
	}
}

func (e EventEnvelope) WithCorrelation(
	correlationID string,
	causationID string,
) EventEnvelope {
	e.CorrelationID = correlationID
	e.CausationID = causationID
	return e
}
