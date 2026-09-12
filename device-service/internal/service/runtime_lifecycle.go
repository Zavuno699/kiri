package service

import (
	"context"
	"errors"
	"time"
)

type DeviceRuntimeLifecycle struct {
	lifecycle *DeviceOutboxLifecycle
	health    *DeviceRuntimeHealth
	now       func() time.Time
}

func NewDeviceRuntimeLifecycle(
	lifecycle *DeviceOutboxLifecycle,
	health *DeviceRuntimeHealth,
) (*DeviceRuntimeLifecycle, error) {
	if lifecycle == nil {
		return nil, errors.New("device lifecycle is required")
	}

	if health == nil {
		return nil, errors.New("runtime health is required")
	}

	return &DeviceRuntimeLifecycle{
		lifecycle: lifecycle,
		health:    health,
		now:       time.Now,
	}, nil
}

func (r *DeviceRuntimeLifecycle) Start(
	ctx context.Context,
) error {
	if err := r.lifecycle.Start(ctx); err != nil {
		return err
	}

	r.health.MarkStarted(r.now())

	return nil
}

func (r *DeviceRuntimeLifecycle) Stop(
	ctx context.Context,
) error {
	err := r.lifecycle.Stop(ctx)

	r.health.MarkStopped()

	return err
}
