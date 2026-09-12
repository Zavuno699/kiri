package messaging

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
)

var (
	ErrEmptyEventPayload = errors.New("event payload is empty")
	ErrInvalidEvent      = errors.New("invalid event envelope")
)

func EncodeEvent(envelope EventEnvelope) ([]byte, error) {
	if envelope.EventID == "" {
		return nil, fmt.Errorf("%w: event_id is required", ErrInvalidEvent)
	}

	if envelope.EventType == "" {
		return nil, fmt.Errorf("%w: event_type is required", ErrInvalidEvent)
	}

	if envelope.EventVersion <= 0 {
		return nil, fmt.Errorf("%w: event_version must be greater than zero", ErrInvalidEvent)
	}

	if envelope.Producer == "" {
		return nil, fmt.Errorf("%w: producer is required", ErrInvalidEvent)
	}

	return json.Marshal(envelope)
}

func DecodeEvent(payload []byte) (EventEnvelope, error) {
	if len(bytes.TrimSpace(payload)) == 0 {
		return EventEnvelope{}, ErrEmptyEventPayload
	}

	decoder := json.NewDecoder(bytes.NewReader(payload))
	decoder.DisallowUnknownFields()

	var envelope EventEnvelope

	if err := decoder.Decode(&envelope); err != nil {
		return EventEnvelope{}, fmt.Errorf(
			"%w: %v",
			ErrInvalidEvent,
			err,
		)
	}

	if envelope.EventID == "" {
		return EventEnvelope{}, fmt.Errorf(
			"%w: event_id is required",
			ErrInvalidEvent,
		)
	}

	if envelope.EventType == "" {
		return EventEnvelope{}, fmt.Errorf(
			"%w: event_type is required",
			ErrInvalidEvent,
		)
	}

	if envelope.EventVersion <= 0 {
		return EventEnvelope{}, fmt.Errorf(
			"%w: event_version must be greater than zero",
			ErrInvalidEvent,
		)
	}

	if envelope.Producer == "" {
		return EventEnvelope{}, fmt.Errorf(
			"%w: producer is required",
			ErrInvalidEvent,
		)
	}

	return envelope, nil
}
