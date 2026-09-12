package service

import "context"

type DeviceStateService struct {
	Repository DeviceServiceRepository
	State      *DeviceStateMachine
}

func NewDeviceStateService(
	repository DeviceServiceRepository,
	state *DeviceStateMachine,
) *DeviceStateService {
	return &DeviceStateService{
		Repository: repository,
		State:      state,
	}
}

func (s *DeviceStateService) Transition(
	ctx context.Context,
	deviceID string,
	next string,
) error {
	current, err := s.Repository.Get(
		ctx,
		deviceID,
	)
	if err != nil {
		if next != DeviceStatusRegistered {
			return err
		}

		return s.Repository.Save(
			ctx,
			DeviceRecord{
				ID:     deviceID,
				Status: DeviceStatusRegistered,
			},
		)
	}

	if err := s.State.Transition(
		current.Status,
		next,
	); err != nil {
		return err
	}

	return s.Repository.Save(
		ctx,
		DeviceRecord{
			ID:     deviceID,
			Status: next,
		},
	)
}
