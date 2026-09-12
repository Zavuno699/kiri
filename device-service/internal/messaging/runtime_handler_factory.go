package messaging

func NewProductionRuntimeHandler(
	router *EventRouter,
) (*RuntimeConsumerBridge, error) {
	pipeline, err := NewConsumerPipeline(router)
	if err != nil {
		return nil, err
	}

	return NewRuntimeConsumerBridge(pipeline), nil
}
