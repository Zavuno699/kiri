package messaging

type ConsumerPolicy struct {
	AllowedTopics []string
	Retry         RetryPolicy
	DeadLetter    bool
}

func DefaultConsumerPolicy() ConsumerPolicy {
	return ConsumerPolicy{
		AllowedTopics: AllTopics(),
		Retry:         DefaultRetryPolicy(),
		DeadLetter:    true,
	}
}

func (p ConsumerPolicy) Allows(topic string) bool {
	for _, allowed := range p.AllowedTopics {
		if allowed == topic {
			return true
		}
	}

	return false
}
