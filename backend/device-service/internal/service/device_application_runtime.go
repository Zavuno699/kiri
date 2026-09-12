package service

import "context"

type DeviceApplicationRuntime struct {
	Services *DeviceApplicationServices
}

func NewDeviceApplicationRuntime(
	services *DeviceApplicationServices,
) *DeviceApplicationRuntime {
	return &DeviceApplicationRuntime{
		Services: services,
	}
}

func (r *DeviceApplicationRuntime) Register(
	ctx context.Context,
	record DeviceRecord,
) error {
	return r.Services.Registration.Register(ctx, record)
}

func (r *DeviceApplicationRuntime) Status(
	ctx context.Context,
	deviceID string,
	status string,
) error {
	return r.Services.Status.Update(ctx, deviceID, status)
}

func (r *DeviceApplicationRuntime) Command(
	ctx context.Context,
	request DeviceTransportRequest,
) (DeviceTransportResponse, error) {
	return r.Services.Commands.Execute(ctx, request)
}
