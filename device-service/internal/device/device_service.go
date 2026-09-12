package device

import (
	"context"
)

type Service struct {
	Manager  *Manager
	Registry *Registry
}

func NewService(
	manager *Manager,
	registry *Registry,
) *Service {
	return &Service{
		Manager:  manager,
		Registry: registry,
	}
}

func (s *Service) Start(
	ctx context.Context,
	deviceID string,
	config Config,
) error {
	client := NewDefaultClient(config)

	return s.Manager.Start(
		ctx,
		deviceID,
		client,
	)
}

func (s *Service) Stop(
	ctx context.Context,
	deviceID string,
) error {
	return s.Manager.Stop(
		ctx,
		deviceID,
	)
}
