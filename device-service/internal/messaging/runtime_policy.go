package messaging

type RuntimePolicy struct {
	Topics   *TopicRegistry
	Delivery DeliveryPolicy
	Consumer ConsumerPolicy
}

func NewRuntimePolicy() *RuntimePolicy {
	return &RuntimePolicy{
		Topics:   NewDefaultTopicRegistry(),
		Delivery: DefaultDeliveryPolicy(),
		Consumer: DefaultConsumerPolicy(),
	}
}

func (p *RuntimePolicy) Validate() error {
	if p == nil {
		return nil
	}

	if p.Topics == nil {
		return ErrUnknownTopic
	}

	if p.Delivery.MaxPayload <= 0 {
		return ErrEmptyEventPayload
	}

	if p.Consumer.Retry.MaxAttempts <= 0 {
		return ErrInvalidRetryPolicy
	}

	return nil
}
