package service

import "context"

type DeviceStateApplication struct {
	StateMachine *DeviceStateMachine
	Transition   *DeviceStateService
}

func NewDeviceStateApplication(
	stateMachine *DeviceStateMachine,
	transition *DeviceStateService,
) *DeviceStateApplication {
	return &DeviceStateApplication{
		StateMachine: stateMachine,
		Transition:   transition,
	}
}

func (a *DeviceStateApplication) TransitionTo(
	ctx context.Context,
	deviceID string,
	status string,
) error {
	return a.Transition.Transition(
		ctx,
		deviceID,
		status,
	)
}
