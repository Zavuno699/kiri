package service

import "context"

type DeviceStateQueryApplication struct {
	Query *DeviceStateQuery
}

func NewDeviceStateQueryApplication(
	query *DeviceStateQuery,
) *DeviceStateQueryApplication {
	return &DeviceStateQueryApplication{
		Query: query,
	}
}

func (a *DeviceStateQueryApplication) Get(
	ctx context.Context,
	deviceID string,
) (DeviceQueryResponse, error) {
	record, err := a.Query.Get(ctx, deviceID)
	if err != nil {
		return DeviceQueryResponse{}, err
	}

	return DeviceQueryResponse{
		ID:     record.ID,
		Status: record.Status,
	}, nil
}
