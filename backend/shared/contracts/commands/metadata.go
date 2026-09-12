package commands

import "time"

type Metadata struct {
	CommandID     string
	CommandType   string
	CommandVersion int
	RequestedAt   time.Time
	CorrelationID string
	RequestedBy   string
}
