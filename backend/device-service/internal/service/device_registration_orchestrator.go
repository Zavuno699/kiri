package service

import "context"

type DeviceRegistrationOrchestrator struct {
	Registration *DeviceRegistrationApplication
	State        *DeviceStateService
	Events       *DeviceEventService
}

func NewDeviceRegistrationOrchestrator(
	registration *DeviceRegistrationApplication,
	state *DeviceStateService,
	events *DeviceEventService,
) *DeviceRegistrationOrchestrator {
	return &DeviceRegistrationOrchestrator{
		Registration: registration,
		State:        state,
		Events:       events,
	}
}

func (o *DeviceRegistrationOrchestrator) Register(
	ctx context.Context,
	record DeviceRecord,
) error {
	if err := o.Registration.Register(
		ctx,
		record,
	); err != nil {
		return err
	}

	if err := o.State.Transition(
		ctx,
		record.ID,
		DeviceStatusRegistered,
	); err != nil {
		return err
	}

	return o.Events.Publish(
		ctx,
		DeviceServiceMessage{
			Topic: DeviceConnectedTopic,
			Key:   record.ID,
		},
	)
}
