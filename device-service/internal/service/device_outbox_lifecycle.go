package service

import (
	"context"
	"errors"
)

type DeviceOutboxLifecycle struct {
	startup  *DeviceOutboxApplication
	shutdown *DeviceOutboxShutdown
}

func NewDeviceOutboxLifecycle(
	startup *DeviceOutboxApplication,
	shutdown *DeviceOutboxShutdown,
) (*DeviceOutboxLifecycle, error) {
	if startup == nil {
		return nil, errors.New("device outbox startup is required")
	}

	if shutdown == nil {
		return nil, errors.New("device outbox shutdown is required")
	}

	return &DeviceOutboxLifecycle{
		startup:  startup,
		shutdown: shutdown,
	}, nil
}

func (l *DeviceOutboxLifecycle) Start(
	ctx context.Context,
) error {
	if ctx == nil {
		return errors.New("context is required")
	}

	return l.startup.Start(ctx)
}

func (l *DeviceOutboxLifecycle) Stop(
	ctx context.Context,
) error {
	if ctx == nil {
		return errors.New("context is required")
	}

	return l.shutdown.Stop(ctx)
}
