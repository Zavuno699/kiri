package service

import "context"

type DeviceProductionContext struct {
	Process *DeviceProcessContext
}

func NewDeviceProductionContext(
	parent context.Context,
) *DeviceProductionContext {
	return &DeviceProductionContext{
		Process: NewDeviceProcessContext(parent),
	}
}

func (c *DeviceProductionContext) Context() context.Context {
	return c.Process.Context
}

func (c *DeviceProductionContext) Shutdown() {
	c.Process.Shutdown()
}
