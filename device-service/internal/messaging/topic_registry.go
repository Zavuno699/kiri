package messaging

import "sync"

type TopicRegistry struct {
	mu     sync.RWMutex
	topics map[string]struct{}
}

func NewTopicRegistry(topics ...string) *TopicRegistry {
	registry := &TopicRegistry{
		topics: make(map[string]struct{}, len(topics)),
	}

	for _, topic := range topics {
		if ValidateTopic(topic) == nil {
			registry.topics[topic] = struct{}{}
		}
	}

	return registry
}

func NewDefaultTopicRegistry() *TopicRegistry {
	return NewTopicRegistry(AllTopics()...)
}

func (r *TopicRegistry) Register(topic string) error {
	if err := ValidateTopic(topic); err != nil {
		return err
	}

	r.mu.Lock()
	r.topics[topic] = struct{}{}
	r.mu.Unlock()

	return nil
}

func (r *TopicRegistry) Contains(topic string) bool {
	if r == nil {
		return false
	}

	r.mu.RLock()
	_, ok := r.topics[topic]
	r.mu.RUnlock()

	return ok
}

func (r *TopicRegistry) Topics() []string {
	if r == nil {
		return nil
	}

	r.mu.RLock()
	defer r.mu.RUnlock()

	result := make([]string, 0, len(r.topics))

	for topic := range r.topics {
		result = append(result, topic)
	}

	return result
}
