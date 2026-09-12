package messaging

type RuntimeComponents struct {
	Policy      *RuntimePolicy
	Coordinator *DeliveryCoordinator
	Registry    *TopicRegistry
	Adapter     *MessageEventAdapter
	Router      *EventRouter
	Processor   *MessageDeliveryProcessor
}

func NewRuntimeComponents(
	router *EventRouter,
) *RuntimeComponents {
	policy := NewRuntimePolicy()

	coordinator := NewDeliveryCoordinator()

	adapter := NewMessageEventAdapter(
		policy.Topics,
	)

	processor := NewMessageDeliveryProcessor(
		policy.Delivery,
		coordinator,
		adapter,
		router,
	)

	return &RuntimeComponents{
		Policy:      policy,
		Coordinator: coordinator,
		Registry:    policy.Topics,
		Adapter:     adapter,
		Router:      router,
		Processor:   processor,
	}
}
