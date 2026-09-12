package service

import "context"

type DeviceCommandStateOrchestrator struct {
	Validator *DeviceCommandValidator
	State     *DeviceStateService
	Commands  *DeviceCommandApplicationService
	Events    *DeviceCommandEventService
}

func NewDeviceCommandStateOrchestrator(
	validator *DeviceCommandValidator,
	state *DeviceStateService,
	commands *DeviceCommandApplicationService,
	events *DeviceCommandEventService,
) *DeviceCommandStateOrchestrator {
	return &DeviceCommandStateOrchestrator{
		Validator: validator,
		State:     state,
		Commands:  commands,
		Events:    events,
	}
}

func (o *DeviceCommandStateOrchestrator) Execute(
	ctx context.Context,
	request DeviceCommandRequest,
) (DeviceCommandResponse, error) {
	if err := o.Validator.Validate(request); err != nil {
		return DeviceCommandResponse{}, err
	}

	if err := o.State.Transition(
		ctx,
		request.DeviceID,
		DeviceStatusBusy,
	); err != nil {
		return DeviceCommandResponse{}, err
	}

	response, err := o.Commands.Execute(
		ctx,
		DeviceTransportRequest{
			DeviceID: request.DeviceID,
			Payload:  request.Payload,
		},
	)

	if err != nil {
		_ = o.State.Transition(
			ctx,
			request.DeviceID,
			DeviceStatusFailed,
		)

		_ = o.Events.Failed(
			ctx,
			request.DeviceID,
			request.Payload,
		)

		return DeviceCommandResponse{}, err
	}

	if err := o.State.Transition(
		ctx,
		request.DeviceID,
		DeviceStatusReady,
	); err != nil {
		return DeviceCommandResponse{}, err
	}

	_ = o.Events.Completed(
		ctx,
		request.DeviceID,
		response.Payload,
	)

	return DeviceCommandResponse{
		DeviceID: request.DeviceID,
		Command:  request.Command,
		Status:   DeviceStatusReady,
		Payload:  response.Payload,
	}, nil
}
