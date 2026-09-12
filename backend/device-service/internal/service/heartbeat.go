package service

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/device-service/internal/model"
)

type DeviceHeartbeat struct {
	DeviceID   uuid.UUID
	ObservedAt time.Time
}

func (h DeviceHeartbeat) Validate() error {
	if h.DeviceID == uuid.Nil {
		return errors.New("device ID is required")
	}

	if h.ObservedAt.IsZero() {
		return errors.New("heartbeat timestamp is required")
	}

	return nil
}

type HeartbeatDeviceRepository interface {
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

type HeartbeatApplication struct {
	devices HeartbeatDeviceRepository
}

func NewHeartbeatApplication(
	devices HeartbeatDeviceRepository,
) (*HeartbeatApplication, error) {
	if devices == nil {
		return nil, errors.New("device repository is required")
	}

	return &HeartbeatApplication{
		devices: devices,
	}, nil
}

func (a *HeartbeatApplication) RecordHeartbeat(
	ctx context.Context,
	heartbeat DeviceHeartbeat,
	now time.Time,
) (model.Device, error) {
	if ctx == nil {
		return model.Device{}, errors.New("context is required")
	}

	if err := heartbeat.Validate(); err != nil {
		return model.Device{}, err
	}

	if now.IsZero() {
		return model.Device{}, errors.New("processing time is required")
	}

	device, err := a.devices.GetByID(ctx, heartbeat.DeviceID)
	if err != nil {
		return model.Device{}, err
	}

	if device.LifecycleState == model.DeviceRetired {
		return model.Device{}, errors.New("retired device cannot send heartbeat")
	}

	observedAt := heartbeat.ObservedAt.UTC()
	now = now.UTC()

	if observedAt.After(now) {
		return model.Device{}, errors.New("heartbeat timestamp cannot be in the future")
	}

	if err := a.devices.UpdateConnectivity(
		ctx,
		device.ID,
		model.ConnectivityOnline,
		&observedAt,
		device.Version,
		now,
	); err != nil {
		return model.Device{}, err
	}

	device.ConnectivityState = model.ConnectivityOnline
	device.LastHeartbeatAt = &observedAt
	device.UpdatedAt = now
	device.Version++

	if err := device.Validate(); err != nil {
		return model.Device{}, err
	}

	return device, nil
}
