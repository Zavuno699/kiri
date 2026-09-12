package service

import "context"

type DeviceAPIServerLifecycle struct {
	Server *DeviceServiceAPIServer
}

func NewDeviceAPIServerLifecycle(
	server *DeviceServiceAPIServer,
) *DeviceAPIServerLifecycle {
	return &DeviceAPIServerLifecycle{
		Server: server,
	}
}

func (l *DeviceAPIServerLifecycle) Start(
	ctx context.Context,
) error {
	return l.Server.Start(ctx)
}

func (l *DeviceAPIServerLifecycle) Stop(
	ctx context.Context,
) error {
	return l.Server.Stop(ctx)
}
