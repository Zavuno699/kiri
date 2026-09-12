package device

import "context"

type CommandRouter struct {
	Session *Session
}

func NewCommandRouter(
	session *Session,
) *CommandRouter {
	return &CommandRouter{
		Session: session,
	}
}

func (r *CommandRouter) Execute(
	ctx context.Context,
	request Request,
) (Response, error) {
	return r.Session.Send(ctx, request)
}
