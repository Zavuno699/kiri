package service

import (
	"context"
	"errors"
	"time"
)

type DeviceOutboxShutdown struct {
	managed *ManagedDeviceOutboxWorker
	timeout time.Duration
}

func NewDeviceOutboxShutdown(
	managed *ManagedDeviceOutboxWorker,
	timeout time.Duration,
) (*DeviceOutboxShutdown, error) {
	if managed == nil {
		return nil, errors.New("managed outbox worker is required")
	}

	if timeout <= 0 {
		return nil, errors.New("shutdown timeout must be positive")
	}

	return &DeviceOutboxShutdown{
		managed: managed,
		timeout: timeout,
	}, nil
}

func (s *DeviceOutboxShutdown) Stop(
	ctx context.Context,
) error {
	if ctx == nil {
		return errors.New("context is required")
	}

	shutdownCtx, cancel := context.WithTimeout(ctx, s.timeout)
	defer cancel()

	return s.managed.Stop(shutdownCtx)
}
