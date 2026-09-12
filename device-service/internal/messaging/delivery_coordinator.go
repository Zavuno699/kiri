package messaging

import (
	"context"
	"sync"
)

type DeliveryCoordinator struct {
	mu       sync.Mutex
	inflight map[string]struct{}
}

func NewDeliveryCoordinator() *DeliveryCoordinator {
	return &DeliveryCoordinator{
		inflight: make(map[string]struct{}),
	}
}

func (c *DeliveryCoordinator) Begin(eventID string) bool {
	if c == nil || eventID == "" {
		return false
	}

	c.mu.Lock()
	defer c.mu.Unlock()

	if _, exists := c.inflight[eventID]; exists {
		return false
	}

	c.inflight[eventID] = struct{}{}

	return true
}

func (c *DeliveryCoordinator) Complete(eventID string) {
	if c == nil || eventID == "" {
		return
	}

	c.mu.Lock()
	delete(c.inflight, eventID)
	c.mu.Unlock()
}

func (c *DeliveryCoordinator) Execute(
	ctx context.Context,
	eventID string,
	fn func(context.Context) error,
) error {
	if !c.Begin(eventID) {
		return nil
	}

	defer c.Complete(eventID)

	return fn(ctx)
}
