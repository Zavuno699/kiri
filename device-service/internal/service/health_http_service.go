package service

import "context"

var _ DeviceHealthHTTPServiceContract = (*DeviceHealthHTTPService)(nil)

type DeviceHealthHTTPService struct {
	Application *DeviceHealthHTTPApplication
	Server      *DeviceHealthHTTPServerRuntime
}

func NewDeviceHealthHTTPService(
	application *DeviceHealthHTTPApplication,
	server *DeviceHealthHTTPServerRuntime,
) *DeviceHealthHTTPService {
	return &DeviceHealthHTTPService{
		Application: application,
		Server:      server,
	}
}

func (s *DeviceHealthHTTPService) Start(
	ctx context.Context,
) error {
	return s.Application.Start(ctx)
}

func (s *DeviceHealthHTTPService) Stop(
	ctx context.Context,
) error {
	return s.Application.Stop(ctx)
}
