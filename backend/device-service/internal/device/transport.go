package device

import "context"

type Transport interface {
	Connect(context.Context) error
	Send(context.Context, Request) (Response, error)
	Disconnect(context.Context) error
}

type TransportFactory interface {
	NewTransport(Config) Transport
}
