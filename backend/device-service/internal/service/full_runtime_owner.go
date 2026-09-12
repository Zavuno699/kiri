package service

import "context"

type DeviceServiceFullRuntimeOwner struct {
	Bootstrap *DeviceServiceFullRuntimeBootstrap
}

func NewDeviceServiceFullRuntimeOwner(
	bootstrap *DeviceServiceFullRuntimeBootstrap,
) *DeviceServiceFullRuntimeOwner {
	return &DeviceServiceFullRuntimeOwner{
		Bootstrap: bootstrap,
	}
}

func (o *DeviceServiceFullRuntimeOwner) Start(
	ctx context.Context,
) error {
	return o.Bootstrap.Start(ctx)
}

func (o *DeviceServiceFullRuntimeOwner) Stop(
	ctx context.Context,
) error {
	return o.Bootstrap.Stop(ctx)
}
