package service

type DeviceReadinessService struct {
	Runtime     *DeviceRuntimeState
	Integration *DeviceServiceIntegrationRuntime
}

func NewDeviceReadinessService(
	runtime *DeviceRuntimeState,
	integration *DeviceServiceIntegrationRuntime,
) *DeviceReadinessService {
	return &DeviceReadinessService{
		Runtime:     runtime,
		Integration: integration,
	}
}

func (s *DeviceReadinessService) Ready() bool {
	if s.Runtime == nil {
		return false
	}

	return s.Runtime.Running()
}
