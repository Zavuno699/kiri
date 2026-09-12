package metadata

import "time"

// Metadata contains common lifecycle information for KiriLock
// resources.
//
// Version represents the application-level version of the resource.
// It is deliberately separate from database transaction/version
// mechanisms.
type Metadata struct {
	ID            string    `json:"id"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
	Version       int       `json:"version"`
	CorrelationID string    `json:"correlation_id,omitempty"`
}
