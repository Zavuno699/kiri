package service

import "context"

type DeviceProductionShutdown struct {
	Lifecycle *DeviceProductionLifecycle
}

func NewDeviceProductionShutdown(
	lifecycle *DeviceProductionLifecycle,
) *DeviceProductionShutdown {
	return &DeviceProductionShutdown{
		Lifecycle: lifecycle,
	}
}

func (s *DeviceProductionShutdown) Stop(
	ctx context.Context,
) error {
	return s.Lifecycle.Stop(ctx)
}
