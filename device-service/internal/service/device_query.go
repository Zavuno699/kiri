package service

import "context"

type DeviceQueryService struct {
	Repository DeviceServiceRepository
}

func NewDeviceQueryService(
	repository DeviceServiceRepository,
) *DeviceQueryService {
	return &DeviceQueryService{
		Repository: repository,
	}
}

func (s *DeviceQueryService) Get(
	ctx context.Context,
	deviceID string,
) (DeviceRecord, error) {
	return s.Repository.Get(ctx, deviceID)
}
