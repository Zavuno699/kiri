package service

import "context"

type DeviceIntegrationLifecycle struct {
	Runtime   *DeviceServiceIntegrationRuntime
	Readiness *DeviceIntegrationReadiness
}

func NewDeviceIntegrationLifecycle(
	runtime *DeviceServiceIntegrationRuntime,
	readiness *DeviceIntegrationReadiness,
) *DeviceIntegrationLifecycle {
	return &DeviceIntegrationLifecycle{
		Runtime:   runtime,
		Readiness: readiness,
	}
}

func (l *DeviceIntegrationLifecycle) Start(
	ctx context.Context,
) error {
	return l.Runtime.Start(ctx)
}

func (l *DeviceIntegrationLifecycle) Stop(
	ctx context.Context,
) error {
	return l.Runtime.Stop(ctx)
}
