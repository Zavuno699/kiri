package service

import "context"

type DeviceProductionHTTPService struct {
	Composition *DeviceProductionHTTPComposition
}

func NewDeviceProductionHTTPService(
	composition *DeviceProductionHTTPComposition,
) *DeviceProductionHTTPService {
	return &DeviceProductionHTTPService{
		Composition: composition,
	}
}

func (s *DeviceProductionHTTPService) Start(
	ctx context.Context,
) error {
	if err := s.Composition.Bootstrap.Start(ctx); err != nil {
		return &DeviceServiceStartupError{
			Component: "http",
			Err:       err,
		}
	}

	return nil
}

func (s *DeviceProductionHTTPService) Stop(
	ctx context.Context,
) error {
	if err := s.Composition.Bootstrap.Stop(ctx); err != nil {
		return &DeviceServiceShutdownError{
			Component: "http",
			Err:       err,
		}
	}

	return nil
}
