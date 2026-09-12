package service

import "context"

type DeviceCommandApplication struct {
	Commands *DeviceCommandApplicationService
	Mapper   *DeviceCommandMapper
}

func NewDeviceCommandApplication(
	commands *DeviceCommandApplicationService,
	mapper *DeviceCommandMapper,
) *DeviceCommandApplication {
	return &DeviceCommandApplication{
		Commands: commands,
		Mapper:   mapper,
	}
}

func (a *DeviceCommandApplication) Execute(
	ctx context.Context,
	request DeviceCommandRequest,
) (DeviceCommandResponse, error) {
	transportRequest, err := a.Mapper.Map(request)
	if err != nil {
		return DeviceCommandResponse{}, err
	}

	response, err := a.Commands.Execute(
		ctx,
		transportRequest,
	)
	if err != nil {
		return DeviceCommandResponse{}, err
	}

	return DeviceCommandResponse{
		DeviceID: request.DeviceID,
		Command:  request.Command,
		Status:   "ok",
		Payload:  response.Payload,
	}, nil
}
