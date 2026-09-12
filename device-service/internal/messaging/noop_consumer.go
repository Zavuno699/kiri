package messaging

import "context"

type NoopConsumer struct{}

func NewNoopConsumer() *NoopConsumer {
	return &NoopConsumer{}
}

func (c *NoopConsumer) Subscribe(
	context.Context,
	[]string,
	Handler,
) error {
	return nil
}

func (c *NoopConsumer) Start(
	context.Context,
) error {
	return nil
}

func (c *NoopConsumer) Stop(
	context.Context,
) error {
	return nil
}

type NoopConsumerFactory struct{}

func NewNoopConsumerFactory() *NoopConsumerFactory {
	return &NoopConsumerFactory{}
}

func (f *NoopConsumerFactory) NewConsumer(Config) Consumer {
	return NewNoopConsumer()
}
