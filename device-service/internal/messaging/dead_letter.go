package messaging

import "strings"

const DeadLetterSuffix = ".dead-letter"

func DeadLetterTopic(topic string) string {
	topic = strings.TrimSpace(topic)

	if topic == "" {
		return DeadLetterSuffix
	}

	if strings.HasSuffix(topic, DeadLetterSuffix) {
		return topic
	}

	return topic + DeadLetterSuffix
}
