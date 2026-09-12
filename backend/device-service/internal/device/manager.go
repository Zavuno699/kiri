package device

import (
	"context"
)

type Manager struct {
	Registry *Registry
}

func NewManager(
	registry *Registry,
) *Manager {
	return &Manager{
		Registry: registry,
	}
}

func (m *Manager) Start(
	ctx context.Context,
	deviceID string,
	client *Client,
) error {
	if err := m.Registry.Register(deviceID, client); err != nil {
		return err
	}

	return client.Start(ctx)
}

func (m *Manager) Stop(
	ctx context.Context,
	deviceID string,
) error {
	client, err := m.Registry.Get(deviceID)
	if err != nil {
		return err
	}

	err = client.Stop(ctx)
	m.Registry.Remove(deviceID)

	return err
}
