package events

import "time"

type EventMetadata struct {
	EventID       string    `json:"event_id"`
	EventType     string    `json:"event_type"`
	EventVersion  int       `json:"event_version"`
	OccurredAt    time.Time `json:"occurred_at"`
	CorrelationID string    `json:"correlation_id"`
	CausationID   string    `json:"causation_id,omitempty"`
	Producer      string    `json:"producer"`
}

type EventEnvelope struct {
	Metadata EventMetadata `json:"metadata"`
	TenantID string        `json:"tenant_id,omitempty"`
	DeviceID string        `json:"device_id,omitempty"`
	Payload  any           `json:"payload"`
}
