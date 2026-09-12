package service

import "context"

type DeviceTransportIntegration struct {
	Transport DeviceServiceDeviceTransport
}

func NewDeviceTransportIntegration(
	transport DeviceServiceDeviceTransport,
) *DeviceTransportIntegration {
	return &DeviceTransportIntegration{
		Transport: transport,
	}
}

func (d *DeviceTransportIntegration) Send(
	ctx context.Context,
	request DeviceTransportRequest,
) (DeviceTransportResponse, error) {
	return d.Transport.Send(ctx, request)
}

func (d *DeviceTransportIntegration) Stop(
	ctx context.Context,
) error {
	return d.Transport.Close(ctx)
}
