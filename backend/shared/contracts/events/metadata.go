package events

import "time"

type Metadata struct {
	EventID       string
	EventType     string
	EventVersion  int
	OccurredAt    time.Time
	CorrelationID string
	CausationID   string
	Producer      string
}
