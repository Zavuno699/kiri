package service

import "sync"

type DeviceMetricsRegistry struct {
	mu       sync.RWMutex
	counters map[string]uint64
}

func NewDeviceMetricsRegistry() *DeviceMetricsRegistry {
	return &DeviceMetricsRegistry{
		counters: make(map[string]uint64),
	}
}

func (r *DeviceMetricsRegistry) Increment(name string) {
	r.mu.Lock()
	defer r.mu.Unlock()

	r.counters[name]++
}

func (r *DeviceMetricsRegistry) Value(name string) uint64 {
	r.mu.RLock()
	defer r.mu.RUnlock()

	return r.counters[name]
}
