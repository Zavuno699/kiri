package service

import (
	"context"
	"errors"
)

type DeviceOutboxApplication struct {
	runtime *DeviceOutboxRuntime
}

func NewDeviceOutboxApplication(
	runtime *DeviceOutboxRuntime,
) (*DeviceOutboxApplication, error) {
	if runtime == nil {
		return nil, errors.New("device outbox runtime is required")
	}

	return &DeviceOutboxApplication{
		runtime: runtime,
	}, nil
}

func (a *DeviceOutboxApplication) Start(
	ctx context.Context,
) error {
	if ctx == nil {
		return errors.New("context is required")
	}

	return a.runtime.Start(ctx)
}
