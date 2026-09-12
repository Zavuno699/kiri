package messaging

type DeadLetterMessage struct {
	OriginalTopic   string
	DeadLetterTopic string
	EventID         string
	Payload         []byte
	Attempt         int
	Reason          string
}

func NewDeadLetterMessage(
	message Message,
	eventID string,
	attempt int,
	reason string,
) DeadLetterMessage {
	return DeadLetterMessage{
		OriginalTopic:   message.Topic,
		DeadLetterTopic: DeadLetterTopic(message.Topic),
		EventID:         eventID,
		Payload:         append([]byte(nil), message.Value...),
		Attempt:         attempt,
		Reason:          reason,
	}
}
