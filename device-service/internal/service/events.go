package service

import (
	"errors"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/device-service/internal/model"
)

const (
	EventDeviceHeartbeat           = "device.heartbeat"
	EventDeviceConnectivityChanged = "device.connectivity.changed"
)

type DeviceHeartbeatEvent struct {
	EventID      uuid.UUID `json:"event_id"`
	EventVersion int       `json:"event_version"`
	DeviceID     uuid.UUID `json:"device_id"`
	ObservedAt   time.Time `json:"observed_at"`
}

func (e DeviceHeartbeatEvent) Validate() error {
	if e.EventID == uuid.Nil {
		return errors.New("event ID is required")
	}

	if e.EventVersion < 1 {
		return errors.New("event version must be positive")
	}

	if e.DeviceID == uuid.Nil {
		return errors.New("device ID is required")
	}

	if e.ObservedAt.IsZero() {
		return errors.New("observed timestamp is required")
	}

	return nil
}

type DeviceConnectivityChangedEvent struct {
	EventID         uuid.UUID               `json:"event_id"`
	EventVersion    int                     `json:"event_version"`
	DeviceID        uuid.UUID               `json:"device_id"`
	PreviousState   model.ConnectivityState `json:"previous_state"`
	CurrentState    model.ConnectivityState `json:"current_state"`
	LastHeartbeatAt *time.Time              `json:"last_heartbeat_at,omitempty"`
	EvaluatedAt     time.Time               `json:"evaluated_at"`
}

func (e DeviceConnectivityChangedEvent) Validate() error {
	if e.EventID == uuid.Nil {
		return errors.New("event ID is required")
	}

	if e.EventVersion < 1 {
		return errors.New("event version must be positive")
	}

	if e.DeviceID == uuid.Nil {
		return errors.New("device ID is required")
	}

	if err := e.PreviousState.Validate(); err != nil {
		return err
	}

	if err := e.CurrentState.Validate(); err != nil {
		return err
	}

	if e.PreviousState == e.CurrentState {
		return errors.New("connectivity state did not change")
	}

	if e.EvaluatedAt.IsZero() {
		return errors.New("evaluation time is required")
	}

	if e.LastHeartbeatAt != nil && e.LastHeartbeatAt.After(e.EvaluatedAt) {
		return errors.New("last heartbeat cannot be after evaluation time")
	}

	return nil
}
