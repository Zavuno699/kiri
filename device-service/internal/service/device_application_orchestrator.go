package service

import "context"

type DeviceApplicationOrchestrator struct {
	Controller *DeviceApplicationController
}

func NewDeviceApplicationOrchestrator(
	controller *DeviceApplicationController,
) *DeviceApplicationOrchestrator {
	return &DeviceApplicationOrchestrator{
		Controller: controller,
	}
}

func (o *DeviceApplicationOrchestrator) Register(
	ctx context.Context,
	record DeviceRecord,
) error {
	return o.Controller.Register(ctx, record)
}

func (o *DeviceApplicationOrchestrator) SetStatus(
	ctx context.Context,
	deviceID string,
	status string,
) error {
	return o.Controller.UpdateStatus(ctx, deviceID, status)
}

func (o *DeviceApplicationOrchestrator) ExecuteCommand(
	ctx context.Context,
	request DeviceTransportRequest,
) (DeviceTransportResponse, error) {
	return o.Controller.Command(ctx, request)
}
