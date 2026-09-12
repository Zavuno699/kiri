package service

import "context"

type DeviceApplicationController struct {
	Runtime *DeviceApplicationRuntime
}

func NewDeviceApplicationController(
	runtime *DeviceApplicationRuntime,
) *DeviceApplicationController {
	return &DeviceApplicationController{
		Runtime: runtime,
	}
}

func (c *DeviceApplicationController) Register(
	ctx context.Context,
	record DeviceRecord,
) error {
	return c.Runtime.Register(ctx, record)
}

func (c *DeviceApplicationController) UpdateStatus(
	ctx context.Context,
	deviceID string,
	status string,
) error {
	return c.Runtime.Status(ctx, deviceID, status)
}

func (c *DeviceApplicationController) Command(
	ctx context.Context,
	request DeviceTransportRequest,
) (DeviceTransportResponse, error) {
	return c.Runtime.Command(ctx, request)
}
