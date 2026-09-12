
package contracts

import "time"

type EventMetadataContract struct {
	EventID       string
	EventType     string
	EventVersion  int
	OccurredAt    time.Time
	CorrelationID string
	CausationID   string
	Producer      string
}

