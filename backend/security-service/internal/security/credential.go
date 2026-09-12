package security

import (
	"errors"
	"time"
)

type CredentialType string

const (
	CredentialWebAuthn CredentialType = "webauthn"
	CredentialDevice   CredentialType = "device"
	CredentialService  CredentialType = "service"
	CredentialSession  CredentialType = "session"
)

type CredentialState string

const (
	CredentialActive    CredentialState = "active"
	CredentialSuspended CredentialState = "suspended"
	CredentialRevoked   CredentialState = "revoked"
	CredentialExpired   CredentialState = "expired"
)

type Credential struct {
	ID          string
	IdentityID  string
	Type        CredentialType
	State       CredentialState
	Fingerprint string
	IssuedAt    time.Time
	ExpiresAt   time.Time
}

var (
	ErrInvalidCredential = errors.New("invalid credential")
	ErrCredentialDenied  = errors.New("credential denied")
)

func (c Credential) Validate() error {
	if c.ID == "" || c.IdentityID == "" || c.Fingerprint == "" {
		return ErrInvalidCredential
	}

	switch c.Type {
	case CredentialWebAuthn,
		CredentialDevice,
		CredentialService,
		CredentialSession:
	default:
		return ErrInvalidCredential
	}

	switch c.State {
	case CredentialActive,
		CredentialSuspended,
		CredentialRevoked,
		CredentialExpired:
	default:
		return ErrInvalidCredential
	}

	return nil
}

func (c Credential) Usable(now time.Time) error {
	if err := c.Validate(); err != nil {
		return err
	}

	if c.State != CredentialActive {
		return ErrCredentialDenied
	}

	if !c.ExpiresAt.IsZero() && !now.Before(c.ExpiresAt) {
		return ErrCredentialDenied
	}

	return nil
}
