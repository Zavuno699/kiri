package messaging

import "context"

type Handler interface {
	Handle(context.Context, Message) error
}

type Consumer interface {
	Subscribe(context.Context, []string, Handler) error
	Start(context.Context) error
	Stop(context.Context) error
}

type ConsumerFactory interface {
	NewConsumer(Config) Consumer
}
