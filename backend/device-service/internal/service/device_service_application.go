package service

import "context"

var _ DeviceServiceApplicationContract = (*DeviceServiceApplication)(nil)

type DeviceServiceApplication struct {
	Runtime *DeviceServiceRuntime
}

func NewDeviceServiceApplication(
	runtime *DeviceServiceRuntime,
) *DeviceServiceApplication {
	return &DeviceServiceApplication{
		Runtime: runtime,
	}
}

func (a *DeviceServiceApplication) Start(
	ctx context.Context,
) error {
	return a.Runtime.Start(ctx)
}

func (a *DeviceServiceApplication) Stop(
	ctx context.Context,
) error {
	return a.Runtime.Stop(ctx)
}
