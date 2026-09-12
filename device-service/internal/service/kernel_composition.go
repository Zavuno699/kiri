package service

import "context"

type DeviceServiceKernelComposition struct {
	Kernel *DeviceServiceKernel
}

func NewDeviceServiceKernelComposition(
	kernel *DeviceServiceKernel,
) *DeviceServiceKernelComposition {
	return &DeviceServiceKernelComposition{
		Kernel: kernel,
	}
}

func (c *DeviceServiceKernelComposition) Start(
	ctx context.Context,
) error {
	return c.Kernel.Start(ctx)
}

func (c *DeviceServiceKernelComposition) Stop(
	ctx context.Context,
) error {
	return c.Kernel.Stop(ctx)
}
