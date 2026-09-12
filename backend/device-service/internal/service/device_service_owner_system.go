package service

import "context"

type DeviceServiceOwnerSystem struct {
	Application DeviceServiceOwnershipContract
}

func NewDeviceServiceOwnerSystem(
	application DeviceServiceOwnershipContract,
) *DeviceServiceOwnerSystem {
	return &DeviceServiceOwnerSystem{
		Application: application,
	}
}

func (s *DeviceServiceOwnerSystem) Start(
	ctx context.Context,
) error {
	return s.Application.Start(ctx)
}

func (s *DeviceServiceOwnerSystem) Stop(
	ctx context.Context,
) error {
	return s.Application.Stop(ctx)
}
