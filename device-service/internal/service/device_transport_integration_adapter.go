package service

import (
	"context"

	"github.com/kirilock/backend/device-service/internal/device"
)

type DeviceTransportIntegrationAdapter struct {
	Runtime *device.DeviceRuntimeService
	Config  device.Config
}

func NewDeviceTransportIntegrationAdapter(
	runtime *device.DeviceRuntimeService,
	cfg device.Config,
) *DeviceTransportIntegrationAdapter {
	return &DeviceTransportIntegrationAdapter{
		Runtime: runtime,
		Config:  cfg,
	}
}

func (a *DeviceTransportIntegrationAdapter) Send(
	ctx context.Context,
	request DeviceTransportRequest,
) (DeviceTransportResponse, error) {
	if a == nil || a.Runtime == nil {
		return DeviceTransportResponse{}, context.Canceled
	}

	response, err := a.Runtime.Execute(
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

func (a *DeviceTransportIntegrationAdapter) Close(context.Context) error {
	// DeviceRuntimeService ownership is retained by the device graph.
	// The adapter must not stop the runtime independently.
	return nil
}
