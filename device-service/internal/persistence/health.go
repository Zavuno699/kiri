package persistence

import "context"

type Health struct {
	Runtime *Runtime
}

func NewHealth(
	runtime *Runtime,
) *Health {
	return &Health{
		Runtime: runtime,
	}
}

func (h *Health) Check(
	ctx context.Context,
) error {
	return h.Runtime.Database.Ping(ctx)
}
