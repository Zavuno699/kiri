package security

import (
	"sync"
	"time"
)

type RevocationRecord struct {
	ID         string
	Subject    string
	Credential string
	Reason     string
	RevokedAt  time.Time
	ExpiresAt  time.Time
}

type RevocationRegistry struct {
	mu      sync.RWMutex
	records map[string]RevocationRecord
}

func NewRevocationRegistry() *RevocationRegistry {
	return &RevocationRegistry{
		records: make(map[string]RevocationRecord),
	}
}

func (r *RevocationRegistry) Revoke(
	record RevocationRecord,
) {
	if r == nil || record.ID == "" {
		return
	}

	r.mu.Lock()
	r.records[record.ID] = record
	r.mu.Unlock()
}

func (r *RevocationRegistry) IsRevoked(
	id string,
	now time.Time,
) bool {
	if r == nil || id == "" {
		return false
	}

	r.mu.RLock()
	record, ok := r.records[id]
	r.mu.RUnlock()

	if !ok {
		return false
	}

	if !record.ExpiresAt.IsZero() &&
		now.After(record.ExpiresAt) {
		r.mu.Lock()
		delete(r.records, id)
		r.mu.Unlock()

		return false
	}

	return true
}

func (r *RevocationRegistry) RevokeSubject(
	subject string,
	reason string,
	now time.Time,
) {
	if subject == "" {
		return
	}

	r.Revoke(
		RevocationRecord{
			ID:        subject,
			Subject:   subject,
			Reason:    reason,
			RevokedAt: now,
		},
	)
}
