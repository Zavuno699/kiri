package service

import "context"

type DeviceShutdownCoordinator struct {
	Process *DeviceServiceRuntimeProcess
}

func NewDeviceShutdownCoordinator(
	process *DeviceServiceRuntimeProcess,
) *DeviceShutdownCoordinator {
	return &DeviceShutdownCoordinator{
		Process: process,
	}
}

func (c *DeviceShutdownCoordinator) Shutdown(
	ctx context.Context,
) error {
	return c.Process.Stop(ctx)
}
