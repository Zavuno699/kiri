package service

import "context"

type DeviceApplicationHealthService struct {
	Repository DeviceServiceRepository
}

func NewDeviceApplicationHealthService(
	repository DeviceServiceRepository,
) *DeviceApplicationHealthService {
	return &DeviceApplicationHealthService{
		Repository: repository,
	}
}

func (s *DeviceApplicationHealthService) Check(
	ctx context.Context,
	deviceID string,
) (DeviceRecord, error) {
	return s.Repository.Get(ctx, deviceID)
}
