package service

import "context"

type NoopDeviceServiceDeviceTransport struct{}

func NewNoopDeviceServiceDeviceTransport() *NoopDeviceServiceDeviceTransport {
	return &NoopDeviceServiceDeviceTransport{}
}

func (t *NoopDeviceServiceDeviceTransport) Send(
	context.Context,
	DeviceTransportRequest,
) (DeviceTransportResponse, error) {
	return DeviceTransportResponse{}, nil
}

func (t *NoopDeviceServiceDeviceTransport) Close(context.Context) error {
	return nil
}
