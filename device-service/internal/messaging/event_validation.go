package messaging

import (
	"errors"
	"fmt"
	"strings"
)

var ErrInvalidTopic = errors.New("invalid messaging topic")

func ValidateTopic(topic string) error {
	topic = strings.TrimSpace(topic)

	if topic == "" {
		return fmt.Errorf("%w: topic is required", ErrInvalidTopic)
	}

	if strings.ContainsAny(topic, " \t\r\n") {
		return fmt.Errorf("%w: whitespace is not allowed", ErrInvalidTopic)
	}

	if !strings.Contains(topic, ".") {
		return fmt.Errorf(
			"%w: topic must contain a namespace separator",
			ErrInvalidTopic,
		)
	}

	return nil
}

func ValidateEventEnvelope(envelope EventEnvelope) error {
	if envelope.EventID == "" {
		return fmt.Errorf("%w: event_id is required", ErrInvalidEvent)
	}

	if envelope.EventType == "" {
		return fmt.Errorf("%w: event_type is required", ErrInvalidEvent)
	}

	if envelope.EventVersion <= 0 {
		return fmt.Errorf("%w: event_version must be positive", ErrInvalidEvent)
	}

	if envelope.OccurredAt.IsZero() {
		return fmt.Errorf("%w: occurred_at is required", ErrInvalidEvent)
	}

	if envelope.Producer == "" {
		return fmt.Errorf("%w: producer is required", ErrInvalidEvent)
	}

	return nil
}
