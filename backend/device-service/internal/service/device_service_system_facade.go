package service

import "context"

type DeviceServiceSystemFacade struct {
	Composition *DeviceServiceKernelComposition
}

func NewDeviceServiceSystemFacade(
	composition *DeviceServiceKernelComposition,
) *DeviceServiceSystemFacade {
	return &DeviceServiceSystemFacade{
		Composition: composition,
	}
}

func (s *DeviceServiceSystemFacade) Start(
	ctx context.Context,
) error {
	return s.Composition.Start(ctx)
}

func (s *DeviceServiceSystemFacade) Stop(
	ctx context.Context,
) error {
	return s.Composition.Stop(ctx)
}
