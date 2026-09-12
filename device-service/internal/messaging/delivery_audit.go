package messaging

import "time"

type DeliveryAudit struct {
	EventID    string
	Topic      string
	Attempt    int
	Outcome    DeliveryOutcome
	Reason     string
	OccurredAt time.Time
}

func NewDeliveryAudit(
	result ProcessingResult,
) DeliveryAudit {
	return DeliveryAudit{
		EventID:    result.EventID,
		Topic:      result.Topic,
		Attempt:    result.Attempt,
		Outcome:    result.Decision.Outcome,
		Reason:     result.ErrorMessage,
		OccurredAt: time.Now().UTC(),
	}
}
