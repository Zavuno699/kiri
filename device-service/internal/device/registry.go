package device

import (
	"errors"
	"sync"
)

type Registry struct {
	mu      sync.RWMutex
	clients map[string]*Client
}

func NewRegistry() *Registry {
	return &Registry{
		clients: make(map[string]*Client),
	}
}

func (r *Registry) Register(
	deviceID string,
	client *Client,
) error {
	if deviceID == "" {
		return errors.New("device ID is required")
	}

	r.mu.Lock()
	defer r.mu.Unlock()

	r.clients[deviceID] = client

	return nil
}

func (r *Registry) Get(
	deviceID string,
) (*Client, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	client, ok := r.clients[deviceID]
	if !ok {
		return nil, errors.New("device not registered")
	}

	return client, nil
}

func (r *Registry) Remove(
	deviceID string,
) {
	r.mu.Lock()
	defer r.mu.Unlock()

	delete(r.clients, deviceID)
}
