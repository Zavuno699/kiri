package service

import "context"

type DeviceProcessContext struct {
	Context context.Context
	Cancel  context.CancelFunc
}

func NewDeviceProcessContext(
	parent context.Context,
) *DeviceProcessContext {
	ctx, cancel := context.WithCancel(parent)

	return &DeviceProcessContext{
		Context: ctx,
		Cancel:  cancel,
	}
}

func (p *DeviceProcessContext) Shutdown() {
	p.Cancel()
}
