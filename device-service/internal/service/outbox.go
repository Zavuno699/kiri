package service

import (
	"context"
	"encoding/json"
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/kirilock/backend/device-service/internal/repository"
)

type DeviceEventOutboxApplication struct {
	repo repository.DeviceOutboxRepository
}

func NewDeviceEventOutboxApplication(
	repo repository.DeviceOutboxRepository,
) *DeviceEventOutboxApplication {
	return &DeviceEventOutboxApplication{repo: repo}
}

func (a *DeviceEventOutboxApplication) Enqueue(
	ctx context.Context,
	eventID uuid.UUID,
	eventType string,
	eventVersion int,
	deviceID uuid.UUID,
	correlationID string,
	causationID string,
	producer string,
	payload any,
	now time.Time,
) error {
	if ctx == nil {
		return errors.New("context is required")
	}
	if eventID == uuid.Nil {
		return errors.New("event ID is required")
	}
	if strings.TrimSpace(eventType) == "" {
		return errors.New("event type is required")
	}
	if eventVersion < 1 {
		return errors.New("event version must be at least 1")
	}
	if deviceID == uuid.Nil {
		return errors.New("device ID is required")
	}
	if strings.TrimSpace(correlationID) == "" {
		return errors.New("correlation ID is required")
	}
	if strings.TrimSpace(producer) == "" {
		return errors.New("producer is required")
	}
	if now.IsZero() {
		return errors.New("event time is required")
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return err
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

	return a.repo.Enqueue(ctx, event)
}
