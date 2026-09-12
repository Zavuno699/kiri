package service

import "context"

type DeviceHealthHTTPServerRuntime struct {
	Server DeviceHealthHTTPServer
}

func NewDeviceHealthHTTPServerRuntime(
	server DeviceHealthHTTPServer,
) *DeviceHealthHTTPServerRuntime {
	return &DeviceHealthHTTPServerRuntime{
		Server: server,
	}
}

func (r *DeviceHealthHTTPServerRuntime) Start(
	ctx context.Context,
) error {
	return r.Server.Start(ctx)
}

func (r *DeviceHealthHTTPServerRuntime) Stop(
	ctx context.Context,
) error {
	return r.Server.Stop(ctx)
}
