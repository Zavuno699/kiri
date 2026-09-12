package service

import "context"

type DeviceStatusApplication struct {
	Status *DeviceStatusService
}

func NewDeviceStatusApplication(
	status *DeviceStatusService,
) *DeviceStatusApplication {
	return &DeviceStatusApplication{
		Status: status,
	}
}

func (a *DeviceStatusApplication) Update(
	ctx context.Context,
	deviceID string,
	status string,
) error {
	return a.Status.Update(
		ctx,
		deviceID,
		status,
	)
}
