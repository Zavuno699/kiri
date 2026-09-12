package service

import "sync"

type DeviceIdempotencyStore struct {
	mu      sync.Mutex
	results map[string]DeviceCommandResponse
}

func NewDeviceIdempotencyStore() *DeviceIdempotencyStore {
	return &DeviceIdempotencyStore{
		results: make(map[string]DeviceCommandResponse),
	}
}

func (s *DeviceIdempotencyStore) Get(
	key string,
) (DeviceCommandResponse, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()

	result, ok := s.results[key]
	return result, ok
}

func (s *DeviceIdempotencyStore) Put(
	key string,
	result DeviceCommandResponse,
) {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.results[key] = result
}
