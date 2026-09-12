package service

import "context"

type DeviceDisconnectOrchestrator struct {
	State  *DeviceStateService
	Events *DeviceEventService
}

func NewDeviceDisconnectOrchestrator(
	state *DeviceStateService,
	events *DeviceEventService,
) *DeviceDisconnectOrchestrator {
	return &DeviceDisconnectOrchestrator{
		State:  state,
		Events: events,
	}
}

func (o *DeviceDisconnectOrchestrator) Disconnect(
	ctx context.Context,
	deviceID string,
) error {
	if err := o.State.Transition(
		ctx,
		deviceID,
		DeviceStatusDisconnected,
	); err != nil {
		return err
	}

	return o.Events.Publish(
		ctx,
		DeviceServiceMessage{
			Topic: DeviceDisconnectedTopic,
			Key:   deviceID,
		},
	)
}
