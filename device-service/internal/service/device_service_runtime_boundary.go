package service

import "context"

type DeviceServiceRuntimeBoundary struct {
	Application DeviceServiceApplicationContract
}

func NewDeviceServiceRuntimeBoundary(
	application DeviceServiceApplicationContract,
) *DeviceServiceRuntimeBoundary {
	return &DeviceServiceRuntimeBoundary{
		Application: application,
	}
}

func (r *DeviceServiceRuntimeBoundary) Start(
	ctx context.Context,
) error {
	return r.Application.Start(ctx)
}

func (r *DeviceServiceRuntimeBoundary) Stop(
	ctx context.Context,
) error {
	return r.Application.Stop(ctx)
}
