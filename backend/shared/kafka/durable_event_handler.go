package kafka

import (
	"context"
	"encoding/json"
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"

	"github.com/kirilock/backend/shared/events"
)

type DurableEventHandler struct {
	consumerName string
	repository   EventProcessingRepository
	handler      EventHandlerFunc
}

func NewDurableEventHandler(
	consumerName string,
	repository EventProcessingRepository,
	handler EventHandlerFunc,
) (*DurableEventHandler, error) {
	if strings.TrimSpace(consumerName) == "" {
		return nil, errors.New("consumer name is required")
	}
	if repository == nil {
		return nil, errors.New("event processing repository is required")
	}
	if handler == nil {
		return nil, errors.New("event handler is required")
	}

	return &DurableEventHandler{
		consumerName: strings.TrimSpace(consumerName),
		repository:   repository,
		handler:      handler,
	}, nil
}

func (h *DurableEventHandler) Handle(
	ctx context.Context,
	message ConsumerMessage,
) error {
	if h == nil {
		return errors.New("durable event handler is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if err := message.Validate(); err != nil {
		return err
	}

	var envelope events.EventEnvelope
	if err := json.Unmarshal(message.Value, &envelope); err != nil {
		return errors.New("invalid event envelope: " + err.Error())
	}

	if envelope.Metadata.EventID == "" {
		return errors.New("event envelope ID is required")
	}
	if envelope.Metadata.EventType == "" {
		return errors.New("event envelope type is required")
	}
	if envelope.Metadata.EventVersion < 1 {
		return errors.New("event envelope version must be positive")
	}
	if envelope.Metadata.OccurredAt.IsZero() {
		return errors.New("event envelope occurred_at is required")
	}
	if envelope.Metadata.Producer == "" {
		return errors.New("event envelope producer is required")
	}

	if envelope.Metadata.EventID != message.EventID {
		return errors.New("Kafka event ID does not match envelope")
	}
	if envelope.Metadata.EventType != message.EventType {
		return errors.New("Kafka event type does not match envelope")
	}

	eventID, err := uuid.Parse(message.EventID)
	if err != nil {
		return errors.New("Kafka event ID must be a UUID")
	}

	now := time.Now().UTC()

	var correlationID *uuid.UUID
	if strings.TrimSpace(envelope.Metadata.CorrelationID) != "" {
		parsedCorrelationID, parseErr := uuid.Parse(
			envelope.Metadata.CorrelationID,
		)
		if parseErr != nil {
			return errors.New("event correlation ID must be a UUID")
		}
		correlationID = &parsedCorrelationID
	}

	record := EventProcessingRecord{
		ConsumerName:  h.consumerName,
		EventID:       eventID,
		EventType:     message.EventType,
		Status:        EventProcessingStarted,
		CorrelationID: correlationID,
		OccurredAt:    envelope.Metadata.OccurredAt.UTC(),
		StartedAt:     now,
		Version:       1,
	}

	claimed, err := h.repository.Claim(ctx, record)
	if err != nil {
		return err
	}

	if !claimed {
		return nil
	}

	if err := h.handler(ctx, message); err != nil {
		releaseErr := h.repository.Release(
			ctx,
			h.consumerName,
			eventID,
		)
		if releaseErr != nil {
			return errors.Join(err, releaseErr)
		}
		return err
	}

	return h.repository.Complete(
		ctx,
		h.consumerName,
		eventID,
		time.Now().UTC(),
	)
}
