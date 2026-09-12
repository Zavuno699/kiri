package messaging

import (
	"context"
	"errors"
)

type RuntimeConsumerBridge struct {
	Pipeline *ConsumerPipeline
}

func NewRuntimeConsumerBridge(
	pipeline *ConsumerPipeline,
) *RuntimeConsumerBridge {
	return &RuntimeConsumerBridge{
		Pipeline: pipeline,
	}
}

func (b *RuntimeConsumerBridge) Handle(
	ctx context.Context,
	message Message,
) error {
	if b == nil {
		return errors.New("runtime consumer bridge is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if b.Pipeline == nil {
		return errors.New("consumer pipeline is required")
	}
	if b.Pipeline.Handler == nil {
		return errors.New("consumer pipeline handler is required")
	}
	if b.Pipeline.Handler.Service == nil {
		return errors.New("consumer service is required")
	}
	if b.Pipeline.Handler.Service.Processor == nil {
		return errors.New("message delivery processor is required")
	}
	if b.Pipeline.Handler.Service.Processor.Router == nil {
		return errors.New("event router is required")
	}

	return b.Pipeline.Handler.Handle(
		ctx,
		message,
	)
}

func (b *RuntimeConsumerBridge) Start() {
	if b == nil || b.Pipeline == nil {
		return
	}

	b.Pipeline.Start()
}

func (b *RuntimeConsumerBridge) Stop() {
	if b == nil || b.Pipeline == nil {
		return
	}

	b.Pipeline.Stop()
}

func (b *RuntimeConsumerBridge) Readiness() ConsumerReadiness {
	if b == nil || b.Pipeline == nil {
		return ConsumerReadiness{}
	}

	return b.Pipeline.Readiness()
}

func (b *RuntimeConsumerBridge) ReadinessSnapshot() RuntimeConsumerReadiness {
	if b == nil || b.Pipeline == nil {
		return RuntimeConsumerReadiness{}
	}

	readiness := b.Pipeline.Readiness()

	return RuntimeConsumerReadiness{
		Configured: true,
		Started:    readiness.Started,
		Policy:     readiness.PolicyReady,
		Router:     readiness.RouterReady,
		Processor:  readiness.ProcessorReady,
		Ready:      readiness.Ready(),
	}
}
