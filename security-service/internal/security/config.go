package security

import (
	"errors"
	"os"
	"strconv"
	"time"
)

type Config struct {
	SessionTTL   time.Duration
	ChallengeTTL time.Duration
	ClockSkew    time.Duration
}

func NewConfig() Config {
	sessionTTL := 30 * time.Minute
	challengeTTL := 5 * time.Minute
	clockSkew := 30 * time.Second

	if raw := os.Getenv("KIRI_SESSION_TTL_MINUTES"); raw != "" {
		if value, err := strconv.Atoi(raw); err == nil && value > 0 {
			sessionTTL = time.Duration(value) * time.Minute
		}
	}

	if raw := os.Getenv("KIRI_CHALLENGE_TTL_SECONDS"); raw != "" {
		if value, err := strconv.Atoi(raw); err == nil && value > 0 {
			challengeTTL = time.Duration(value) * time.Second
		}
	}

	if raw := os.Getenv("KIRI_CLOCK_SKEW_SECONDS"); raw != "" {
		if value, err := strconv.Atoi(raw); err == nil && value > 0 {
			clockSkew = time.Duration(value) * time.Second
		}
	}

	return Config{
		SessionTTL:   sessionTTL,
		ChallengeTTL: challengeTTL,
		ClockSkew:    clockSkew,
	}
}

func (c Config) Validate() error {
	if c.SessionTTL <= 0 {
		return errors.New("session TTL must be greater than zero")
	}

	if c.ChallengeTTL <= 0 {
		return errors.New("challenge TTL must be greater than zero")
	}

	if c.ClockSkew < 0 {
		return errors.New("clock skew cannot be negative")
	}

	return nil
}
