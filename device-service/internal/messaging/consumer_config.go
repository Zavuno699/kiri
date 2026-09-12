package messaging

type ConsumerConfig struct {
	Producer string
	Policy   ConsumerPolicy
	Delivery DeliveryPolicy
	AutoAck  bool
}

func DefaultConsumerConfig() ConsumerConfig {
	return ConsumerConfig{
		Producer: "kiri-device-service",
		Policy:   DefaultConsumerPolicy(),
		Delivery: DefaultDeliveryPolicy(),
		AutoAck:  true,
	}
}
