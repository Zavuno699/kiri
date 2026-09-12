package messaging

import "context"

func EnvelopeFromContext(
	ctx context.Context,
	envelope EventEnvelope,
	producer string,
) EventEnvelope {
	envelope.Producer = producer

	if correlationID := CorrelationID(ctx); correlationID != "" {
		envelope.CorrelationID = correlationID
	}

	if causationID := CausationID(ctx); causationID != "" {
		envelope.CausationID = causationID
	}

	return envelope
}
