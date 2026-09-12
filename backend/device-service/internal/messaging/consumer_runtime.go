package messaging

import "context"

type ConsumerRuntime struct {
	Consumer Consumer
	Topics   []string
	Handler  Handler
}

func NewConsumerRuntime(
	consumer Consumer,
	topics []string,
	handler Handler,
) *ConsumerRuntime {
	return &ConsumerRuntime{
		Consumer: consumer,
		Topics:   append([]string(nil), topics...),
		Handler:  handler,
	}
}

func (r *ConsumerRuntime) Start(
	ctx context.Context,
) error {
	return r.Consumer.Subscribe(
		ctx,
		r.Topics,
		r.Handler,
	)
}

func (r *ConsumerRuntime) Run(
	ctx context.Context,
) error {
	if err := r.Start(ctx); err != nil {
		return err
	}

	return r.Consumer.Start(ctx)
}

func (r *ConsumerRuntime) Stop(
	ctx context.Context,
) error {
	return r.Consumer.Stop(ctx)
}
