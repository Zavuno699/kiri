package security

import (
	"crypto/rand"
	"encoding/hex"
	"time"
)

func NewAuditEvent(
	action AuditAction,
	subject string,
	actor string,
	now time.Time,
) AuditEvent {
	var idBytes [16]byte
	_, _ = rand.Read(idBytes[:])

	return AuditEvent{
		ID:         hex.EncodeToString(idBytes[:]),
		Action:     action,
		Subject:    subject,
		Actor:      actor,
		OccurredAt: now,
		Metadata:   make(map[string]string),
	}
}
