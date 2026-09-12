package messaging

import (
	"errors"
	"os"
	"strings"

	sharedkafka "github.com/kirilock/backend/shared/kafka"
)

func NewProductionKafkaConfig() (sharedkafka.Config, error) {
	env := NewEnvironmentConfig()

	if len(env.Brokers) == 0 {
		return sharedkafka.Config{}, errors.New(
			"DEVICE_MESSAGE_BROKERS is required",
		)
	}

	clientID := strings.TrimSpace(env.ClientID)
	if clientID == "" {
		return sharedkafka.Config{}, errors.New(
			"DEVICE_MESSAGE_CLIENT_ID is required",
		)
	}

	topicPrefix := strings.TrimSpace(
		os.Getenv("KAFKA_TOPIC_PREFIX"),
	)
	if topicPrefix == "" {
		topicPrefix = "kirilock"
	}

	requiredAcks := strings.TrimSpace(
		os.Getenv("KAFKA_REQUIRED_ACKS"),
	)
	if requiredAcks == "" {
		requiredAcks = "all"
	}

	return sharedkafka.Config{
		Brokers:      append([]string(nil), env.Brokers...),
		ClientID:     clientID,
		TopicPrefix:  topicPrefix,
		RequiredAcks: requiredAcks,
	}, nil
}
