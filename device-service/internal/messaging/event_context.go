package messaging

type EventContext struct {
	CorrelationID string
	CausationID   string
	Producer      string
}

func NewEventContext(
	producer string,
	correlationID string,
	causationID string,
) EventContext {
	return EventContext{
		Producer:      producer,
		CorrelationID: correlationID,
		CausationID:   causationID,
	}
}

func (c EventContext) Apply(
	envelope EventEnvelope,
) EventEnvelope {
	envelope.Producer = c.Producer

	if c.CorrelationID != "" {
		envelope.CorrelationID = c.CorrelationID
	}

	if c.CausationID != "" {
		envelope.CausationID = c.CausationID
	}

	return envelope
}
