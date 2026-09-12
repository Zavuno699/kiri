package service

import (
	"context"
	"encoding/json"
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/kirilock/backend/device-service/internal/model"
	"github.com/kirilock/backend/device-service/internal/repository"
)

type AtomicHeartbeatApplication struct {
	repo repository.TransactionalHeartbeatRepository
}

func NewAtomicHeartbeatApplication(
	repo repository.TransactionalHeartbeatRepository,
) *AtomicHeartbeatApplication {
	return &AtomicHeartbeatApplication{repo: repo}
}

func (a *AtomicHeartbeatApplication) RecordHeartbeat(
	ctx context.Context,
	device model.Device,
	observedAt time.Time,
	now time.Time,
	correlationID string,
) (model.Device, error) {
	if ctx == nil {
		return model.Device{}, errors.New("context is required")
	}
	if device.ID == uuid.Nil {
		return model.Device{}, errors.New("device ID is required")
	}
	if strings.TrimSpace(correlationID) == "" {
		return model.Device{}, errors.New("correlation ID is required")
	}
	if observedAt.IsZero() {
		return model.Device{}, errors.New("observed heartbeat time is required")
	}
	if now.IsZero() {
		return model.Device{}, errors.New("processing time is required")
	}
	if observedAt.After(now) {
		return model.Device{}, errors.New(
			"heartbeat cannot be in the future",
		)
	}

	if device.LifecycleState == model.DeviceRetired {
		return model.Device{}, errors.New(
			"retired device cannot record heartbeat",
		)
	}

	previousState := device.ConnectivityState

	device.ConnectivityState = model.ConnectivityOnline
	device.LastHeartbeatAt = &observedAt

	if err := device.Validate(); err != nil {
		return model.Device{}, err
	}

	events := make([]repository.DeviceOutboxEvent, 0, 2)

	heartbeatEventID := uuid.New()
	heartbeatPayload := DeviceHeartbeatEvent{
		EventID:      heartbeatEventID,
		EventVersion: 1,
		DeviceID:     device.ID,
		ObservedAt:   observedAt.UTC(),
	}

	heartbeatOutbox, err := newDeviceOutboxEvent(
		heartbeatEventID,
		EventDeviceHeartbeat,
		1,
		device.ID,
		correlationID,
		"",
		"device-service",
		heartbeatPayload,
		now,
	)
	if err != nil {
		return model.Device{}, err
	}

	events = append(events, heartbeatOutbox)

	if previousState != model.ConnectivityOnline {
		connectivityEventID := uuid.New()

		connectivityPayload := DeviceConnectivityChangedEvent{
			EventID:         connectivityEventID,
			EventVersion:    1,
			DeviceID:        device.ID,
			PreviousState:   previousState,
			CurrentState:    model.ConnectivityOnline,
			LastHeartbeatAt: &observedAt,
			EvaluatedAt:     now.UTC(),
		}

		connectivityOutbox, err := newDeviceOutboxEvent(
			connectivityEventID,
			EventDeviceConnectivityChanged,
			1,
			device.ID,
			correlationID,
			heartbeatEventID.String(),
			"device-service",
			connectivityPayload,
			now,
		)
		if err != nil {
			return model.Device{}, err
		}

		events = append(events, connectivityOutbox)
	}

	return a.repo.RecordHeartbeatWithOutbox(
		ctx,
		device,
		now.UTC(),
		events,
	)
}

func newDeviceOutboxEvent(
	eventID uuid.UUID,
	eventType string,
	eventVersion int,
	deviceID uuid.UUID,
	correlationID string,
	causationID string,
	producer string,
	payload any,
	now time.Time,
) (repository.DeviceOutboxEvent, error) {
	body, err := json.Marshal(payload)
	if err != nil {
		return repository.DeviceOutboxEvent{}, err
	}

	event := repository.DeviceOutboxEvent{
		ID:            uuid.New(),
		EventID:       eventID,
		EventType:     eventType,
		EventVersion:  eventVersion,
		AggregateID:   deviceID,
		CorrelationID: correlationID,
		CausationID:   causationID,
		Producer:      producer,
		Payload:       body,
		Status:        "PENDING",
		Attempts:      0,
		AvailableAt:   now.UTC(),
		CreatedAt:     now.UTC(),
		UpdatedAt:     now.UTC(),
		Version:       1,
	}

	if err := event.Validate(); err != nil {
		return repository.DeviceOutboxEvent{}, err
	}

	return event, nil
}
