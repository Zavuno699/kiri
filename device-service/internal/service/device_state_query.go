package service

import "context"

type DeviceStateQuery struct {
	Repository DeviceServiceRepository
}

func NewDeviceStateQuery(
	repository DeviceServiceRepository,
) *DeviceStateQuery {
	return &DeviceStateQuery{
		Repository: repository,
	}
}

func (q *DeviceStateQuery) Get(
	ctx context.Context,
	deviceID string,
) (DeviceRecord, error) {
	return q.Repository.Get(ctx, deviceID)
}
