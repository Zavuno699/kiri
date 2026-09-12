package device

import "context"

type NoopTransport struct{}

func NewNoopTransport() *NoopTransport {
	return &NoopTransport{}
}

func (t *NoopTransport) Connect(
	context.Context,
) error {
	return nil
}

func (t *NoopTransport) Send(
	_ context.Context,
	request Request,
) (Response, error) {
	return Response{
		Command: request.Command,
		Payload: request.Payload,
	}, nil
}

func (t *NoopTransport) Disconnect(
	context.Context,
) error {
	return nil
}

type NoopTransportFactory struct{}

func NewNoopTransportFactory() *NoopTransportFactory {
	return &NoopTransportFactory{}
}

func (f *NoopTransportFactory) NewTransport(
	Config,
) Transport {
	return NewNoopTransport()
}
