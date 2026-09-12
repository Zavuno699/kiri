package service

import (
	"context"

	"github.com/kirilock/backend/device-service/internal/device"
)

type DeviceCommandIntegration struct {
	Runtime *device.ProductionRuntime
}

func NewDeviceCommandIntegration(
	runtime *device.ProductionRuntime,
) *DeviceCommandIntegration {
	return &DeviceCommandIntegration{
		Runtime: runtime,
	}
}

func (i *DeviceCommandIntegration) Start(
	ctx context.Context,
) error {
	return i.Runtime.Start(ctx)
}

func (i *DeviceCommandIntegration) Stop(
	ctx context.Context,
) error {
	return i.Runtime.Stop(ctx)
}
