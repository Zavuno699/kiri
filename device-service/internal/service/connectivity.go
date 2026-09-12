package service

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/device-service/internal/model"
)

type ConnectivityPolicy struct {
	HeartbeatTimeout time.Duration
}

func (p ConnectivityPolicy) Validate() error {
	if p.HeartbeatTimeout <= 0 {
		return errors.New("heartbeat timeout must be positive")
	}

	return nil
}

type ConnectivityEvaluation struct {
	DeviceID      uuid.UUID
	PreviousState model.ConnectivityState
	CurrentState  model.ConnectivityState
	LastHeartbeat *time.Time
	EvaluatedAt   time.Time
	StateChanged  bool
}

func (e ConnectivityEvaluation) Validate() error {
	if e.DeviceID == uuid.Nil {
		return errors.New("device ID is required")
	}

	if err := e.PreviousState.Validate(); err != nil {
		return err
	}

	if err := e.CurrentState.Validate(); err != nil {
		return err
	}

	if e.EvaluatedAt.IsZero() {
		return errors.New("evaluation time is required")
	}

	if e.LastHeartbeat != nil && e.LastHeartbeat.After(e.EvaluatedAt) {
		return errors.New("last heartbeat cannot be after evaluation time")
	}

	if e.PreviousState == e.CurrentState && e.StateChanged {
		return errors.New("state_changed cannot be true when states are equal")
	}

	if e.PreviousState != e.CurrentState && !e.StateChanged {
		return errors.New("state_changed must be true when states differ")
	}

	return nil
}

type ConnectivityRepository interface {
	GetByID(context.Context, uuid.UUID) (model.Device, error)
	UpdateConnectivity(
		context.Context,
		uuid.UUID,
		model.ConnectivityState,
		*time.Time,
		int64,
		time.Time,
	) error
}

type ConnectivityApplication struct {
	devices ConnectivityRepository
	policy  ConnectivityPolicy
}

func NewConnectivityApplication(
	devices ConnectivityRepository,
	policy ConnectivityPolicy,
) (*ConnectivityApplication, error) {
	if devices == nil {
		return nil, errors.New("device repository is required")
	}

	if err := policy.Validate(); err != nil {
		return nil, err
	}

	return &ConnectivityApplication{
		devices: devices,
		policy:  policy,
	}, nil
}

func (a *ConnectivityApplication) Evaluate(
	ctx context.Context,
	deviceID uuid.UUID,
	now time.Time,
) (ConnectivityEvaluation, error) {
	if ctx == nil {
		return ConnectivityEvaluation{}, errors.New("context is required")
	}

	if deviceID == uuid.Nil {
		return ConnectivityEvaluation{}, errors.New("device ID is required")
	}

	if now.IsZero() {
		return ConnectivityEvaluation{}, errors.New("evaluation time is required")
	}

	now = now.UTC()

	device, err := a.devices.GetByID(ctx, deviceID)
	if err != nil {
		return ConnectivityEvaluation{}, err
	}

	previous := device.ConnectivityState
	current := previous

	if device.LifecycleState != model.DeviceRetired {
		if device.LastHeartbeatAt == nil ||
			now.Sub(device.LastHeartbeatAt.UTC()) >= a.policy.HeartbeatTimeout {
			current = model.ConnectivityOffline
		} else {
			current = model.ConnectivityOnline
		}
	}

	evaluation := ConnectivityEvaluation{
		DeviceID:      device.ID,
		PreviousState: previous,
		CurrentState:  current,
		LastHeartbeat: device.LastHeartbeatAt,
		EvaluatedAt:   now,
		StateChanged:  previous != current,
	}

	if err := evaluation.Validate(); err != nil {
		return ConnectivityEvaluation{}, err
	}

	if !evaluation.StateChanged {
		return evaluation, nil
	}

	if err := a.devices.UpdateConnectivity(
		ctx,
		device.ID,
		current,
		device.LastHeartbeatAt,
		device.Version,
		now,
	); err != nil {
		return ConnectivityEvaluation{}, err
	}

	return evaluation, nil
}
