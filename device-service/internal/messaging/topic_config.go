package messaging

type TopicConfig struct {
	Inbound  []string
	Outbound []string
}

func NewTopicConfig(
	inbound []string,
	outbound []string,
) TopicConfig {
	return TopicConfig{
		Inbound:  append([]string(nil), inbound...),
		Outbound: append([]string(nil), outbound...),
	}
}
