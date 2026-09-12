package service

import "context"

type DeviceApplicationRuntimeV2 struct {
	API      *DeviceAPIComposition
	Services *DeviceApplicationAPIServices
}

func NewDeviceApplicationRuntimeV2(
	api *DeviceAPIComposition,
	services *DeviceApplicationAPIServices,
) *DeviceApplicationRuntimeV2 {
	return &DeviceApplicationRuntimeV2{
		API:      api,
		Services: services,
	}
}

func (r *DeviceApplicationRuntimeV2) Start(
	context.Context,
) error {
	return nil
}

func (r *DeviceApplicationRuntimeV2) Stop(
	context.Context,
) error {
	return nil
}
