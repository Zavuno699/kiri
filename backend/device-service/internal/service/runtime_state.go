package service

import "sync"

type DeviceRuntimeState struct {
	mu      sync.Mutex
	running bool
}

func NewDeviceRuntimeState() *DeviceRuntimeState {
	return &DeviceRuntimeState{}
}

func (s *DeviceRuntimeState) Start() {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.running = true
}

func (s *DeviceRuntimeState) Stop() {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.running = false
}

func (s *DeviceRuntimeState) Running() bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.running
}
