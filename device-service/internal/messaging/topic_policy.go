package messaging

import "fmt"

type TopicPolicy struct {
	Publish map[string]struct{}
	Consume map[string]struct{}
}

func NewTopicPolicy(
	publish []string,
	consume []string,
) TopicPolicy {
	policy := TopicPolicy{
		Publish: make(map[string]struct{}, len(publish)),
		Consume: make(map[string]struct{}, len(consume)),
	}

	for _, topic := range publish {
		if ValidateTopic(topic) == nil {
			policy.Publish[topic] = struct{}{}
		}
	}

	for _, topic := range consume {
		if ValidateTopic(topic) == nil {
			policy.Consume[topic] = struct{}{}
		}
	}

	return policy
}

func (p TopicPolicy) CanPublish(topic string) error {
	if _, ok := p.Publish[topic]; !ok {
		return fmt.Errorf("publish not permitted for topic %q", topic)
	}

	return nil
}

func (p TopicPolicy) CanConsume(topic string) error {
	if _, ok := p.Consume[topic]; !ok {
		return fmt.Errorf("consume not permitted for topic %q", topic)
	}

	return nil
}
