package messaging

import "fmt"

type ConsumerPipeline struct {
	Components *RuntimeComponents
	Service    *ConsumerService
	Handler    *EventConsumerHandler
}

func NewConsumerPipeline(
	router *EventRouter,
) (*ConsumerPipeline, error) {
	if router == nil {
		return nil, fmt.Errorf("event router is required")
	}

	components := NewRuntimeComponents(router)

	if err := ValidateRuntimeConfiguration(
		components.Policy,
	); err != nil {
		return nil, fmt.Errorf(
			"messaging runtime configuration: %w",
			err,
		)
	}

	config := DefaultConsumerConfig()

	service := NewConsumerService(
		config,
		components.Processor,
	)

	handler := NewEventConsumerHandler(service)

	return &ConsumerPipeline{
		Components: components,
		Service:    service,
		Handler:    handler,
	}, nil
}

func (p *ConsumerPipeline) Start() {
	if p == nil || p.Service == nil {
		return
	}

	p.Service.Start()
}

func (p *ConsumerPipeline) Stop() {
	if p == nil || p.Service == nil {
		return
	}

	p.Service.Stop()
}

func (p *ConsumerPipeline) Snapshot() ConsumerSnapshot {
	if p == nil || p.Service == nil {
		return ConsumerSnapshot{}
	}

	return p.Service.State.Snapshot()
}
