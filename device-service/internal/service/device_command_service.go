package service

import "context"

type DeviceCommandApplicationService struct {
	Transport DeviceServiceDeviceTransport
	Events    DeviceServiceEventRepository
}

func NewDeviceCommandApplicationService(
	transport DeviceServiceDeviceTransport,
	events DeviceServiceEventRepository,
) *DeviceCommandApplicationService {
	return &DeviceCommandApplicationService{
		Transport: transport,
		Events:    events,
	}
}

func (s *DeviceCommandApplicationService) Execute(
	ctx context.Context,
	request DeviceTransportRequest,
) (DeviceTransportResponse, error) {
	response, err := s.Transport.Send(ctx, request)

	if err != nil {
		_ = s.Events.Append(
			ctx,
			DeviceServiceMessage{
				Topic:   "device.command.failed",
				Key:     request.DeviceID,
				Payload: request.Payload,
			},
		)

		return DeviceTransportResponse{}, err
	}

	_ = s.Events.Append(
		ctx,
		DeviceServiceMessage{
			Topic:   "device.command.completed",
			Key:     request.DeviceID,
			Payload: response.Payload,
		},
	)

	return response, nil
}
