package service

import "context"

type DeviceServiceRuntimeProcess struct {
	Host *DeviceServiceRuntimeHost
}

func NewDeviceServiceRuntimeProcess(
	host *DeviceServiceRuntimeHost,
) *DeviceServiceRuntimeProcess {
	return &DeviceServiceRuntimeProcess{
		Host: host,
	}
}

func (p *DeviceServiceRuntimeProcess) Start(
	ctx context.Context,
) error {
	return p.Host.Start(ctx)
}

func (p *DeviceServiceRuntimeProcess) Stop(
	ctx context.Context,
) error {
	return p.Host.Stop(ctx)
}
