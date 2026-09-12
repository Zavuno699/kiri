package jobs

import "sync"

type DefaultScheduler struct {
	mu      sync.Mutex
	started bool
}

func NewDefaultScheduler() *DefaultScheduler {
	return &DefaultScheduler{}
}

func (s *DefaultScheduler) Start() error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.started = true
	return nil
}

func (s *DefaultScheduler) Stop() error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.started = false
	return nil
}

