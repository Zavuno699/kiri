package security

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"time"
)

type WebAuthnChallenge struct {
	ID        string
	Challenge string
	Subject   string
	CreatedAt time.Time
	ExpiresAt time.Time
	Used      bool
}

var ErrInvalidChallenge = errors.New("invalid authentication challenge")

func NewWebAuthnChallenge(
	id string,
	subject string,
	ttl time.Duration,
	now time.Time,
) (WebAuthnChallenge, error) {
	if id == "" || subject == "" || ttl <= 0 {
		return WebAuthnChallenge{}, ErrInvalidChallenge
	}

	bytes := make([]byte, 32)

	if _, err := rand.Read(bytes); err != nil {
		return WebAuthnChallenge{}, err
	}

	return WebAuthnChallenge{
		ID:        id,
		Challenge: base64.RawURLEncoding.EncodeToString(bytes),
		Subject:   subject,
		CreatedAt: now,
		ExpiresAt: now.Add(ttl),
	}, nil
}

func (c WebAuthnChallenge) ValidAt(now time.Time) bool {
	return c.ID != "" &&
		c.Challenge != "" &&
		c.Subject != "" &&
		!c.Used &&
		now.Before(c.ExpiresAt)
}
