package service

import (
	"errors"
	"time"
)

type DeviceOutboxConfig struct {
	ClaimDuration     time.Duration
	InitialRetryDelay time.Duration
	MaxRetryDelay     time.Duration
	PollInterval      time.Duration
}

func DefaultDeviceOutboxConfig() DeviceOutboxConfig {
	return DeviceOutboxConfig{
		ClaimDuration:     30 * time.Second,
		InitialRetryDelay: 5 * time.Second,
		MaxRetryDelay:     5 * time.Minute,
		PollInterval:      1 * time.Second,
	}
}

func (c DeviceOutboxConfig) Validate() error {
	if c.ClaimDuration <= 0 {
		return errors.New("claim duration must be positive")
	}

	if c.InitialRetryDelay <= 0 {
		return errors.New("initial retry delay must be positive")
	}

	if c.MaxRetryDelay <= 0 {
		return errors.New("max retry delay must be positive")
	}

	if c.MaxRetryDelay < c.InitialRetryDelay {
		return errors.New(
			"max retry delay cannot be less than initial retry delay",
		)
	}

	if c.PollInterval <= 0 {
		return errors.New("poll interval must be positive")
	}

	return nil
}

func (c DeviceOutboxConfig) RetryDelay(attempt int) time.Duration {
	if attempt <= 1 {
		return c.InitialRetryDelay
	}

	delay := c.InitialRetryDelay

	for i := 1; i < attempt; i++ {
		if delay >= c.MaxRetryDelay {
			return c.MaxRetryDelay
		}

		next := delay * 2

		if next < delay || next > c.MaxRetryDelay {
			return c.MaxRetryDelay
		}

		delay = next
	}

	return delay
}
