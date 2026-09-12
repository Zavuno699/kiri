package service

import "context"

var _ DeviceServiceApplicationContract = (*DeviceServiceApplicationRuntime)(nil)

type DeviceServiceApplicationRuntime struct {
	Runtime DeviceServiceRuntimeContract
}

func NewDeviceServiceApplicationRuntime(
	runtime DeviceServiceRuntimeContract,
) *DeviceServiceApplicationRuntime {
	return &DeviceServiceApplicationRuntime{
		Runtime: runtime,
	}
}

func (r *DeviceServiceApplicationRuntime) Start(
	ctx context.Context,
) error {
	return r.Runtime.Start(ctx)
}

func (r *DeviceServiceApplicationRuntime) Stop(
	ctx context.Context,
) error {
	return r.Runtime.Stop(ctx)
}
