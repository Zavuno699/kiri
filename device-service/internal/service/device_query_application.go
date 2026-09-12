package service

import "context"

type DeviceQueryApplication struct {
	Query *DeviceApplicationQueryController
}

func NewDeviceQueryApplication(
	query *DeviceApplicationQueryController,
) *DeviceQueryApplication {
	return &DeviceQueryApplication{
		Query: query,
	}
}

func (a *DeviceQueryApplication) Get(
	ctx context.Context,
	deviceID string,
) (DeviceQueryResponse, error) {
	record, err := a.Query.Get(
		ctx,
		deviceID,
	)
	if err != nil {
		return DeviceQueryResponse{}, err
	}

	return DeviceQueryResponse{
		ID:     record.ID,
		Status: record.Status,
	}, nil
}
