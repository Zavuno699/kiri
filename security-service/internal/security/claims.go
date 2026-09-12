package security

import "time"

type Claims struct {
	Subject      string
	CredentialID string
	Roles        []Role
	Scopes       PermissionSet
	IssuedAt     time.Time
	ExpiresAt    time.Time
	SessionID    string
	RevocationID string
}

func (c Claims) ValidAt(now time.Time) bool {
	if c.Subject == "" ||
		c.CredentialID == "" ||
		c.SessionID == "" {
		return false
	}

	if c.ExpiresAt.IsZero() ||
		!now.Before(c.ExpiresAt) {
		return false
	}

	return true
}

func (c Claims) HasScope(scope Scope) bool {
	return c.Scopes.Has(scope)
}
