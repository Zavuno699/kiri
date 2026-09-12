package messaging

type ProcessingResult struct {
	EventID      string
	EventType    string
	Topic        string
	Attempt      int
	Decision     DeliveryDecision
	ErrorMessage string
}

func NewProcessingResult(
	envelope EventEnvelope,
	topic string,
	attempt int,
	decision DeliveryDecision,
) ProcessingResult {
	return ProcessingResult{
		EventID:   envelope.EventID,
		EventType: envelope.EventType,
		Topic:     topic,
		Attempt:   attempt,
		Decision:  decision,
	}
}
