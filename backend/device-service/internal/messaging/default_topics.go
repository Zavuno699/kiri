package messaging

func NewDefaultTopicConfig() TopicConfig {
	return NewTopicConfig(
		[]string{
			"device.command",
		},
		[]string{
			"device.connected",
			"device.disconnected",
			"device.command.completed",
			"device.command.failed",
		},
	)
}
