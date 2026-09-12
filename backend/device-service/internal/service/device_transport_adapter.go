package service

import (
	"context"

	"github.com/kirilock/backend/device-service/internal/device"
)

type DeviceTransportAdapter struct {
	Runtime *device.DeviceRuntimeService
	Config  device.Config
}

func NewDeviceTransportAdapter(
	runtime *device.DeviceRuntimeService,
	config device.Config,
) *DeviceTransportAdapter {
	return &DeviceTransportAdapter{
		Runtime: runtime,
		Config:  config,
	}
}

func (a *DeviceTransportAdapter) Send(
	ctx context.Context,
	request DeviceTransportRequest,
) (DeviceTransportResponse, error) {
	client, err := a.Runtime.Service.Registry.Get(
		a.Config.DeviceID,
	)
	if err != nil {
		return DeviceTransportResponse{}, err
	}

	response, err := client.Command(
		ctx,
		"device.transport",
		request.Payload,
	)
	if err != nil {
		return DeviceTransportResponse{}, err
	}

	return DeviceTransportResponse{
		Payload: response.Payload,
	}, nil
}

func (a *DeviceTransportAdapter) Close(
	ctx context.Context,
) error {
	return a.Runtime.Stop(
		ctx,
		a.Config.DeviceID,
	)
}
