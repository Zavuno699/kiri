package service

import (
	"errors"
)

type DeviceBootstrap struct {
	lifecycle *DeviceOutboxLifecycle
}

func NewDeviceBootstrap(
	lifecycle *DeviceOutboxLifecycle,
) (*DeviceBootstrap, error) {
	if lifecycle == nil {
		return nil, errors.New("device lifecycle is required")
	}

	return &DeviceBootstrap{
		lifecycle: lifecycle,
	}, nil
}

func (b *DeviceBootstrap) Lifecycle() *DeviceOutboxLifecycle {
	return b.lifecycle
}
