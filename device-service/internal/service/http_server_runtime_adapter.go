package service

import "context"

type DeviceHTTPServerRuntimeAdapter struct {
	Server *DeviceNetHTTPServer
}

func NewDeviceHTTPServerRuntimeAdapter(
	server *DeviceNetHTTPServer,
) *DeviceHTTPServerRuntimeAdapter {
	return &DeviceHTTPServerRuntimeAdapter{
		Server: server,
	}
}

func (a *DeviceHTTPServerRuntimeAdapter) Start(
	ctx context.Context,
) error {
	return a.Server.Start(ctx)
}

func (a *DeviceHTTPServerRuntimeAdapter) Stop(
	ctx context.Context,
) error {
	return a.Server.Stop(ctx)
}
