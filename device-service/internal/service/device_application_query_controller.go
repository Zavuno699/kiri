package service

import "context"

type DeviceApplicationQueryController struct {
	Query *DeviceQueryService
}

func NewDeviceApplicationQueryController(
	query *DeviceQueryService,
) *DeviceApplicationQueryController {
	return &DeviceApplicationQueryController{
		Query: query,
	}
}

func (c *DeviceApplicationQueryController) Get(
	ctx context.Context,
	deviceID string,
) (DeviceRecord, error) {
	if deviceID == "" {
		return DeviceRecord{}, NewDeviceApplicationError(
			"invalid_device_id",
			"device ID is required",
		)
	}

	return c.Query.Get(ctx, deviceID)
}
