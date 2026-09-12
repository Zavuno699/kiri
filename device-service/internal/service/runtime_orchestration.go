package service

import "context"

type DeviceServiceRuntimeOrchestration struct {
	Runtime *DeviceServiceRuntimeIntegration
}

func NewDeviceServiceRuntimeOrchestration(
	runtime *DeviceServiceRuntimeIntegration,
) *DeviceServiceRuntimeOrchestration {
	return &DeviceServiceRuntimeOrchestration{
		Runtime: runtime,
	}
}

func (o *DeviceServiceRuntimeOrchestration) Start(
	context.Context,
) error {
	return nil
}

func (o *DeviceServiceRuntimeOrchestration) Stop(
	context.Context,
) error {
	return nil
}
