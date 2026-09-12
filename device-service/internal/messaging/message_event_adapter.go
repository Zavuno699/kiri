package messaging

type MessageEventAdapter struct {
	Registry *TopicRegistry
}

func NewMessageEventAdapter(
	registry *TopicRegistry,
) *MessageEventAdapter {
	return &MessageEventAdapter{
		Registry: registry,
	}
}

func (a *MessageEventAdapter) Decode(
	message Message,
) (EventEnvelope, error) {
	if a != nil && a.Registry != nil {
		if !a.Registry.Contains(message.Topic) {
			return EventEnvelope{}, ErrUnknownTopic
		}
	}

	if err := ValidateTopic(message.Topic); err != nil {
		return EventEnvelope{}, err
	}

	return DecodeEvent(message.Key)
}
