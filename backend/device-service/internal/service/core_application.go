package service

import "context"

type DeviceServiceCoreApplication struct {
	Runtime *DeviceServiceCoreRuntime
}

func NewDeviceServiceCoreApplication(
	runtime *DeviceServiceCoreRuntime,
) *DeviceServiceCoreApplication {
	return &DeviceServiceCoreApplication{
		Runtime: runtime,
	}
}

func (a *DeviceServiceCoreApplication) Start(
	ctx context.Context,
) error {
	return a.Runtime.Start(ctx)
}

func (a *DeviceServiceCoreApplication) Stop(
	ctx context.Context,
) error {
	return a.Runtime.Stop(ctx)
}
