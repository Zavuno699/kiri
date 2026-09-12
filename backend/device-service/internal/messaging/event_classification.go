package messaging

import "strings"

type MessageClass string

const (
	MessageClassCommand MessageClass = "command"
	MessageClassEvent   MessageClass = "event"
	MessageClassResult  MessageClass = "result"
)

func ClassifyTopic(topic string) MessageClass {
	topic = strings.ToLower(strings.TrimSpace(topic))

	switch {
	case strings.HasSuffix(topic, ".command"):
		return MessageClassCommand

	case strings.HasSuffix(topic, ".result"):
		return MessageClassResult

	default:
		return MessageClassEvent
	}
}

func IsCommandTopic(topic string) bool {
	return ClassifyTopic(topic) == MessageClassCommand
}

func IsEventTopic(topic string) bool {
	return ClassifyTopic(topic) == MessageClassEvent
}
