package service

type DeviceLivenessService struct{}

func NewDeviceLivenessService() *DeviceLivenessService {
	return &DeviceLivenessService{}
}

func (s *DeviceLivenessService) Alive() bool {
	return true
}
