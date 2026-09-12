package messaging

func NewRuntimeConsumerHandler(
	router *EventRouter,
) (*RuntimeConsumerBridge, error) {
	pipeline, err := NewConsumerPipeline(router)
	if err != nil {
		return nil, err
	}

	return NewRuntimeConsumerBridge(pipeline), nil
}
