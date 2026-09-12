package messaging

import "context"

type NoopProducer struct{}

func NewNoopProducer() *NoopProducer {
	return &NoopProducer{}
}

func (p *NoopProducer) Publish(
	context.Context,
	Message,
) error {
	return nil
}

func (p *NoopProducer) Close(
	context.Context,
) error {
	return nil
}

type NoopProducerFactory struct{}

func NewNoopProducerFactory() *NoopProducerFactory {
	return &NoopProducerFactory{}
}

func (f *NoopProducerFactory) NewProducer(Config) Producer {
	return NewNoopProducer()
}
