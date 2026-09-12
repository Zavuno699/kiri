package service

import (
	"errors"
	"time"

	"github.com/kirilock/backend/device-service/internal/repository"
)

type DeviceOutboxRetryPolicy struct {
	Config DeviceOutboxConfig
}

func NewDeviceOutboxRetryPolicy(
	config DeviceOutboxConfig,
) (*DeviceOutboxRetryPolicy, error) {
	if err := config.Validate(); err != nil {
		return nil, err
	}

	return &DeviceOutboxRetryPolicy{
		Config: config,
	}, nil
}

func (p *DeviceOutboxRetryPolicy) Delay(
	event repository.DeviceOutboxEvent,
) (time.Duration, error) {
	if err := event.Validate(); err != nil {
		return 0, err
	}

	if event.Attempts < 1 {
		return 0, errors.New("outbox event has no publication attempt")
	}

	return p.Config.RetryDelay(event.Attempts), nil
}

func (p *DeviceOutboxRetryPolicy) NextAvailableAt(
	event repository.DeviceOutboxEvent,
	now time.Time,
) (time.Time, error) {
	if now.IsZero() {
		return time.Time{}, errors.New("retry time is required")
	}

	delay, err := p.Delay(event)
	if err != nil {
		return time.Time{}, err
	}

	return now.UTC().Add(delay), nil
}
