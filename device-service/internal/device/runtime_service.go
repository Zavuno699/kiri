package device

import (
	"context"
	"errors"
)

type DeviceRuntimeService struct {
	Service *Service
	State   *State
	Health  *Health
}

func NewDeviceRuntimeService(
	service *Service,
	state *State,
	health *Health,
) *DeviceRuntimeService {
	return &DeviceRuntimeService{
		Service: service,
		State:   state,
		Health:  health,
	}
}

func (r *DeviceRuntimeService) Start(
	ctx context.Context,
	deviceID string,
	config Config,
) error {
	if err := r.Service.Start(ctx, deviceID, config); err != nil {
		r.State.SetConnected(false)
		r.State.SetStatus("failed")
		return err
	}

	r.State.SetConnected(true)
	r.State.SetStatus("ready")

	return nil
}

func (r *DeviceRuntimeService) Execute(
	ctx context.Context,
	command string,
	payload []byte,
) (Response, error) {
	deviceID := r.State.DeviceID()

	client, err := r.Service.Registry.Get(deviceID)
	if err != nil {
		return Response{}, errors.New("device runtime client unavailable")
	}

	return client.Command(
		ctx,
		command,
		payload,
	)
}

func (r *DeviceRuntimeService) Stop(
	ctx context.Context,
	deviceID string,
) error {
	err := r.Service.Stop(ctx, deviceID)

	r.State.SetConnected(false)

	if err != nil {
		r.State.SetStatus("failed")
		return err
	}

	r.State.SetStatus("stopped")

	return nil
}
