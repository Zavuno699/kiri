package service

import "context"

type DeviceStatusService struct {
	Repository DeviceServiceRepository
}

func NewDeviceStatusService(
	repository DeviceServiceRepository,
) *DeviceStatusService {
	return &DeviceStatusService{
		Repository: repository,
	}
}

func (s *DeviceStatusService) Update(
	ctx context.Context,
	deviceID string,
	status string,
) error {
	return s.Repository.Save(
		ctx,
		DeviceRecord{
			ID:     deviceID,
			Status: status,
		},
	)
}
