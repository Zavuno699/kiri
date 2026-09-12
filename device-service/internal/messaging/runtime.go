package messaging

import "context"

type Runtime struct {
	Broker *Broker
	Topics TopicConfig
}

func NewRuntime(
	broker *Broker,
	topics TopicConfig,
) *Runtime {
	return &Runtime{
		Broker: broker,
		Topics: topics,
	}
}

func (r *Runtime) Start(
	ctx context.Context,
	handler Handler,
) error {
	return r.Broker.Start(
		ctx,
		r.Topics.Inbound,
		handler,
	)
}

func (r *Runtime) Stop(
	ctx context.Context,
) error {
	return r.Broker.Stop(ctx)
}
