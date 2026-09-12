package service

import "context"

type DeviceLifecycleService struct {
	State  *DeviceStateService
	Events *DeviceEventService
}

func NewDeviceLifecycleService(
	state *DeviceStateService,
	events *DeviceEventService,
) *DeviceLifecycleService {
	return &DeviceLifecycleService{
		State:  state,
		Events: events,
	}
}

func (s *DeviceLifecycleService) Register(
	ctx context.Context,
	deviceID string,
) error {
	if err := s.State.Transition(
		ctx,
		deviceID,
		DeviceStatusRegistered,
	); err != nil {
		return err
	}

	return s.Events.Publish(
		ctx,
		DeviceServiceMessage{
			Topic: DeviceConnectedTopic,
			Key:   deviceID,
		},
	)
}

func (s *DeviceLifecycleService) Connect(
	ctx context.Context,
	deviceID string,
) error {
	if err := s.State.Transition(
		ctx,
		deviceID,
		DeviceStatusReady,
	); err != nil {
		return err
	}

	return s.Events.Publish(
		ctx,
		DeviceServiceMessage{
			Topic: DeviceConnectedTopic,
			Key:   deviceID,
		},
	)
}

func (s *DeviceLifecycleService) Disconnect(
	ctx context.Context,
	deviceID string,
) error {
	if err := s.State.Transition(
		ctx,
		deviceID,
		DeviceStatusDisconnected,
	); err != nil {
		return err
	}

	return s.Events.Publish(
		ctx,
		DeviceServiceMessage{
			Topic: DeviceDisconnectedTopic,
			Key:   deviceID,
		},
	)
}

func (s *DeviceLifecycleService) Fail(
	ctx context.Context,
	deviceID string,
) error {
	if err := s.State.Transition(
		ctx,
		deviceID,
		DeviceStatusFailed,
	); err != nil {
		return err
	}

	return s.Events.Publish(
		ctx,
		DeviceServiceMessage{
			Topic: DeviceCommandFailed,
			Key:   deviceID,
		},
	)
}
