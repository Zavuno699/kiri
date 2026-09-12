package service

import "context"

type DeviceTransportRequest struct {
	DeviceID string
	Payload  []byte
}

type DeviceTransportResponse struct {
	Payload []byte
}

type DeviceServiceDeviceTransport interface {
	Send(context.Context, DeviceTransportRequest) (DeviceTransportResponse, error)
	Close(context.Context) error
}
