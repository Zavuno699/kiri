package service

import "context"

type DeviceStartupCoordinator struct {
	Process *DeviceServiceRuntimeProcess
	State   *DeviceRuntimeState
}

func NewDeviceStartupCoordinator(
	process *DeviceServiceRuntimeProcess,
	state *DeviceRuntimeState,
) *DeviceStartupCoordinator {
	return &DeviceStartupCoordinator{
		Process: process,
		State:   state,
	}
}

func (c *DeviceStartupCoordinator) Start(
	ctx context.Context,
) error {
	err := c.Process.Start(ctx)

	if err != nil {
		return err
	}

	c.State.Start()

	return nil
}
