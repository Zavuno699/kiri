package device

import "context"

type Client struct {
	Config  Config
	Session *Session
	Router  *CommandRouter
}

func NewClient(
	config Config,
	session *Session,
	router *CommandRouter,
) *Client {
	return &Client{
		Config:  config,
		Session: session,
		Router:  router,
	}
}

func (c *Client) Start(
	ctx context.Context,
) error {
	return c.Session.Connect(ctx)
}

func (c *Client) Command(
	ctx context.Context,
	command string,
	payload []byte,
) (Response, error) {
	return c.Router.Execute(
		ctx,
		Request{
			DeviceID: c.Config.DeviceID,
			Command:  command,
			Payload:  payload,
		},
	)
}

func (c *Client) Stop(
	ctx context.Context,
) error {
	return c.Session.Disconnect(ctx)
}
