package service

import "context"

type DeviceWorkerService struct {
	Application *DeviceWorkerApplication
}

func NewDeviceWorkerService(
	application *DeviceWorkerApplication,
) *DeviceWorkerService {
	return &DeviceWorkerService{
		Application: application,
	}
}

func (s *DeviceWorkerService) Start(
	ctx context.Context,
) error {
	return s.Application.Start(ctx)
}

func (s *DeviceWorkerService) Stop(
	ctx context.Context,
) error {
	return s.Application.Stop(ctx)
}
