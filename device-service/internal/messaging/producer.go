package messaging

import "context"

type Producer interface {
	Publish(context.Context, Message) error
	Close(context.Context) error
}

type ProducerFactory interface {
	NewProducer(Config) Producer
}
