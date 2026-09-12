package service

import (
	"errors"
	"sync"
	"time"
)

var (
	ErrRuntimeHealthNotStarted = errors.New("device runtime not started")
)

type DeviceRuntimeHealth struct {
	mu sync.RWMutex

	startedAt time.Time
	running   bool
}

func NewDeviceRuntimeHealth() *DeviceRuntimeHealth {
	return &DeviceRuntimeHealth{}
}

func (h *DeviceRuntimeHealth) MarkStarted(at time.Time) {
	h.mu.Lock()
	defer h.mu.Unlock()

	h.startedAt = at
	h.running = true
}

func (h *DeviceRuntimeHealth) MarkStopped() {
	h.mu.Lock()
	defer h.mu.Unlock()

	h.running = false
}

func (h *DeviceRuntimeHealth) Healthy() bool {
	h.mu.RLock()
	defer h.mu.RUnlock()

	return h.running
}

func (h *DeviceRuntimeHealth) StartedAt() (time.Time, error) {
	h.mu.RLock()
	defer h.mu.RUnlock()

	if !h.running {
		return time.Time{}, ErrRuntimeHealthNotStarted
	}

	return h.startedAt, nil
}
