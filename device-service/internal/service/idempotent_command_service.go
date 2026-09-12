package service

import "context"

type DeviceIdempotentCommandService struct {
	Commands *DeviceCommandApplication
	Store    *DeviceIdempotencyStore
}

func NewDeviceIdempotentCommandService(
	commands *DeviceCommandApplication,
	store *DeviceIdempotencyStore,
) *DeviceIdempotentCommandService {
	return &DeviceIdempotentCommandService{
		Commands: commands,
		Store:    store,
	}
}

func (s *DeviceIdempotentCommandService) Execute(
	ctx context.Context,
	key string,
	request DeviceCommandRequest,
) (DeviceCommandResponse, error) {
	if key != "" {
		if result, ok := s.Store.Get(key); ok {
			return result, nil
		}
	}

	result, err := s.Commands.Execute(
		ctx,
		request,
	)

	if err != nil {
		return DeviceCommandResponse{}, err
	}

	if key != "" {
		s.Store.Put(
			key,
			result,
		)
	}

	return result, nil
}
