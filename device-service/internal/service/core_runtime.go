package service

import "context"

type DeviceServiceCoreRuntime struct {
	Integrations *DeviceServiceCoreIntegrations
}

func NewDeviceServiceCoreRuntime(
	integrations *DeviceServiceCoreIntegrations,
) *DeviceServiceCoreRuntime {
	return &DeviceServiceCoreRuntime{
		Integrations: integrations,
	}
}

func (r *DeviceServiceCoreRuntime) Start(
	context.Context,
) error {
	return nil
}

func (r *DeviceServiceCoreRuntime) Stop(
	context.Context,
) error {
	return nil
}
