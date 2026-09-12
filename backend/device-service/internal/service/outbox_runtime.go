package service

import (
	"context"
	"errors"
)

var ErrDeviceOutboxRuntimeAlreadyStarted = errors.New("device outbox runtime already started")

type DeviceOutboxRuntime struct {
	worker  *DeviceOutboxWorker
	started bool
}

func NewDeviceOutboxRuntime(
	worker *DeviceOutboxWorker,
) *DeviceOutboxRuntime {
	return &DeviceOutboxRuntime{
		worker: worker,
	}
}

func (r *DeviceOutboxRuntime) Start(ctx context.Context) error {
	if r.started {
		return ErrDeviceOutboxRuntimeAlreadyStarted
	}

	r.started = true

	if r.worker == nil {
		return errors.New("device outbox worker is required")
	}

	return r.worker.Start(ctx)
}
