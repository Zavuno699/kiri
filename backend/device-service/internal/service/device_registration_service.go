package service

import "context"

type DeviceRegistrationService struct {
	Repository DeviceServiceRepository
}

func NewDeviceRegistrationService(
	repository DeviceServiceRepository,
) *DeviceRegistrationService {
	return &DeviceRegistrationService{
		Repository: repository,
	}
}

func (s *DeviceRegistrationService) Register(
	ctx context.Context,
	record DeviceRecord,
) error {
	if record.Status == "" {
		record.Status = "registered"
	}

	return s.Repository.Save(ctx, record)
}
