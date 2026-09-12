package service

import "context"

type DeviceHealthHTTPRuntime struct {
	Lifecycle *DeviceHealthHTTPLifecycle
}

func NewDeviceHealthHTTPRuntime(
	lifecycle *DeviceHealthHTTPLifecycle,
) *DeviceHealthHTTPRuntime {
	return &DeviceHealthHTTPRuntime{
		Lifecycle: lifecycle,
	}
}

func (r *DeviceHealthHTTPRuntime) Start(
	ctx context.Context,
) error {
	return r.Lifecycle.Start(ctx)
}

func (r *DeviceHealthHTTPRuntime) Stop(
	ctx context.Context,
) error {
	return r.Lifecycle.Stop(ctx)
}
