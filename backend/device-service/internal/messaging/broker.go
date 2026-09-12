package messaging

import "context"

type Broker struct {
	producer Producer
	consumer Consumer
}

func NewBroker(
	producer Producer,
	consumer Consumer,
) *Broker {
	return &Broker{
		producer: producer,
		consumer: consumer,
	}
}

func (b *Broker) Publish(
	ctx context.Context,
	message Message,
) error {
	return b.producer.Publish(ctx, message)
}

func (b *Broker) Start(
	ctx context.Context,
	topics []string,
	handler Handler,
) error {
	if err := b.consumer.Subscribe(ctx, topics, handler); err != nil {
		return err
	}

	return b.consumer.Start(ctx)
}

func (b *Broker) Stop(
	ctx context.Context,
) error {
	if err := b.consumer.Stop(ctx); err != nil {
		return err
	}

	return b.producer.Close(ctx)
}
