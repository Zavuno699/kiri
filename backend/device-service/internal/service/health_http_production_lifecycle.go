package service

import "context"

type DeviceHealthHTTPProductionLifecycle struct {
	Server DeviceHealthHTTPServer
}

func NewDeviceHealthHTTPProductionLifecycle(
	server DeviceHealthHTTPServer,
) *DeviceHealthHTTPProductionLifecycle {
	return &DeviceHealthHTTPProductionLifecycle{
		Server: server,
	}
}

func (l *DeviceHealthHTTPProductionLifecycle) Start(
	ctx context.Context,
) error {
	return l.Server.Start(ctx)
}

func (l *DeviceHealthHTTPProductionLifecycle) Stop(
	ctx context.Context,
) error {
	return l.Server.Stop(ctx)
}
