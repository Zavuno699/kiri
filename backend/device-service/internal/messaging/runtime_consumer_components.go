package messaging

type RuntimeConsumerComponents struct {
	Router *EventRouter
	Bridge *RuntimeConsumerBridge
	Status RuntimeConsumerStatus
}

func NewRuntimeConsumerComponents(
	router *EventRouter,
) (*RuntimeConsumerComponents, error) {
	pipeline, err := NewConsumerPipeline(router)
	if err != nil {
		return nil, err
	}

	bridge := NewRuntimeConsumerBridge(pipeline)

	return &RuntimeConsumerComponents{
		Router: router,
		Bridge: bridge,
		Status: RuntimeConsumerStatus{
			Configured: true,
			Started:    false,
			Ready:      false,
		},
	}, nil
}

func (c *RuntimeConsumerComponents) Start() {
	if c == nil || c.Bridge == nil {
		return
	}

	c.Bridge.Start()
	c.Status = NewRuntimeConsumerStatus(c.Bridge)
}

func (c *RuntimeConsumerComponents) Stop() {
	if c == nil || c.Bridge == nil {
		return
	}

	c.Bridge.Stop()
	c.Status = NewRuntimeConsumerStatus(c.Bridge)
}
