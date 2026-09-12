package device

import "context"

type Runtime struct {
	Client *Client
}

func NewRuntime(
	client *Client,
) *Runtime {
	return &Runtime{
		Client: client,
	}
}

func (r *Runtime) Start(
	ctx context.Context,
) error {
	return r.Client.Start(ctx)
}

func (r *Runtime) Stop(
	ctx context.Context,
) error {
	return r.Client.Stop(ctx)
}
