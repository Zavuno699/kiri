package device

import "sync"

type State struct {
	mu        sync.RWMutex
	deviceID  string
	status    string
	connected bool
}

func NewState(deviceID string) *State {
	return &State{
		deviceID: deviceID,
		status:   "unknown",
	}
}

func (s *State) SetStatus(status string) {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.status = status
}

func (s *State) SetConnected(connected bool) {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.connected = connected
}

func (s *State) DeviceID() string {
	s.mu.RLock()
	defer s.mu.RUnlock()

	return s.deviceID
}

func (s *State) Status() string {
	s.mu.RLock()
	defer s.mu.RUnlock()

	return s.status
}

func (s *State) Connected() bool {
	s.mu.RLock()
	defer s.mu.RUnlock()

	return s.connected
}
