package service

type DeviceProductionHTTPRegistration struct {
	Service *DeviceProductionHTTPService
}

func NewDeviceProductionHTTPRegistration(
	service *DeviceProductionHTTPService,
) *DeviceProductionHTTPRegistration {
	return &DeviceProductionHTTPRegistration{
		Service: service,
	}
}
