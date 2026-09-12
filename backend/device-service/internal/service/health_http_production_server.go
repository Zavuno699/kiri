package service

import "context"

type DeviceHealthHTTPProductionServer struct {
	Server *DeviceNetHTTPServer
}

func NewDeviceHealthHTTPProductionServer(
	server *DeviceNetHTTPServer,
) *DeviceHealthHTTPProductionServer {
	return &DeviceHealthHTTPProductionServer{
		Server: server,
	}
}

func (s *DeviceHealthHTTPProductionServer) Start(
	ctx context.Context,
) error {
	return s.Server.Start(ctx)
}

func (s *DeviceHealthHTTPProductionServer) Stop(
	ctx context.Context,
) error {
	return s.Server.Stop(ctx)
}
