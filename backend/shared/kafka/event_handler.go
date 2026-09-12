package kafka

import (
	"context"
	"encoding/json"
	"errors"
	"sync"

	"github.com/kirilock/backend/shared/events"
)

type EventHandlerFunc func(context.Context, ConsumerMessage) error

type IdempotentEventHandler struct {
	mu      sync.Mutex
	seen    map[string]struct{}
	handler EventHandlerFunc
}

func NewIdempotentEventHandler(handler EventHandlerFunc) (*IdempotentEventHandler, error) {
	if handler == nil {
		return nil, errors.New("event handler is required")
	}

	return &IdempotentEventHandler{
		seen:    make(map[string]struct{}),
		handler: handler,
	}, nil
}

func (h *IdempotentEventHandler) Handle(
	ctx context.Context,
	message ConsumerMessage,
) error {
	if h == nil {
		return errors.New("event handler is required")
	}

	if err := message.Validate(); err != nil {
		return err
	}

	if ctx == nil {
		return errors.New("context is required")
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

	h.mu.Lock()

	if _, exists := h.seen[message.EventID]; exists {
		h.mu.Unlock()
		return nil
	}

	h.mu.Unlock()

	if err := h.handler(ctx, message); err != nil {
		return err
	}

	h.mu.Lock()
	h.seen[message.EventID] = struct{}{}
	h.mu.Unlock()

	return nil
}
