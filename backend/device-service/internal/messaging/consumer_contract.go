package messaging

type ConsumerContract struct {
	Name          string
	Source        string
	Acknowledges  bool
	SupportsRetry bool
	DeadLetters   bool
}

func DefaultConsumerContract() ConsumerContract {
	return ConsumerContract{
		Name:          "kiri-event-consumer",
		Source:        "messaging.Runtime",
		Acknowledges:  true,
		SupportsRetry: true,
		DeadLetters:   true,
	}
}
