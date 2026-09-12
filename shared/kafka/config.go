package kafka

import (
	"errors"
	"strings"
)

type Config struct {
	Brokers      []string
	ClientID     string
	TopicPrefix  string
	RequiredAcks string
}

func (c Config) Validate() error {
	if len(c.Brokers) == 0 {
		return errors.New("at least one Kafka broker is required")
	}

	for _, broker := range c.Brokers {
		if strings.TrimSpace(broker) == "" {
			return errors.New("Kafka broker cannot be empty")
		}
	}

	if strings.TrimSpace(c.ClientID) == "" {
		return errors.New("Kafka client ID is required")
	}

	if strings.TrimSpace(c.TopicPrefix) == "" {
		return errors.New("Kafka topic prefix is required")
	}

	return nil
}
