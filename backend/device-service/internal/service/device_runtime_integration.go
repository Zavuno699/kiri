package service

import (
	"context"

	"github.com/kirilock/backend/device-service/internal/device"
)

type DeviceRuntimeIntegration struct {
	Controller *device.Controller
	Config     device.Config
}

func NewDeviceRuntimeIntegration(
	controller *device.Controller,
	config device.Config,
) *DeviceRuntimeIntegration {
	return &DeviceRuntimeIntegration{
		Controller: controller,
		Config:     config,
	}
}

func (i *DeviceRuntimeIntegration) Start(
	ctx context.Context,
) error {
	return i.Controller.Start(ctx)
}

func (i *DeviceRuntimeIntegration) Stop(
	ctx context.Context,
) error {
	return i.Controller.Stop(ctx)
}

func (i *DeviceRuntimeIntegration) Execute(
	ctx context.Context,
	command string,
	payload []byte,
) ([]byte, error) {
	return i.Controller.Execute(
		ctx,
		command,
		payload,
	)
}
