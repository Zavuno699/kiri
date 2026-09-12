package device

import (
	"context"
	"sync"
)

type Session struct {
	Transport Transport

	mu        sync.Mutex
	connected bool
}

func NewSession(
	transport Transport,
) *Session {
	return &Session{
		Transport: transport,
	}
}

func (s *Session) Connect(
	ctx context.Context,
) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if s.connected {
		return nil
	}

	if err := s.Transport.Connect(ctx); err != nil {
		return err
	}

	s.connected = true

	return nil
}

func (s *Session) Send(
	ctx context.Context,
	request Request,
) (Response, error) {
	return s.Transport.Send(ctx, request)
}

func (s *Session) Disconnect(
	ctx context.Context,
) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if !s.connected {
		return nil
	}

	err := s.Transport.Disconnect(ctx)
	s.connected = false

	return err
}

func (s *Session) Connected() bool {
	s.mu.Lock()
	defer s.mu.Unlock()

	return s.connected
}
