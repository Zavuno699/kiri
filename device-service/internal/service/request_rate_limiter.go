package service

import (
	"net"
	"net/http"
	"sync"
	"time"
)

type DeviceRequestRateLimiter struct {
	mu       sync.Mutex
	limit    int
	window   time.Duration
	requests map[string][]time.Time
}

func NewDeviceRequestRateLimiter(
	limit int,
	window time.Duration,
) *DeviceRequestRateLimiter {
	if limit <= 0 {
		limit = 60
	}

	if window <= 0 {
		window = time.Minute
	}

	return &DeviceRequestRateLimiter{
		limit:    limit,
		window:   window,
		requests: make(map[string][]time.Time),
	}
}

func (l *DeviceRequestRateLimiter) Allow(
	key string,
	now time.Time,
) bool {
	l.mu.Lock()
	defer l.mu.Unlock()

	cutoff := now.Add(-l.window)

	current := l.requests[key]
	kept := current[:0]

	for _, timestamp := range current {
		if timestamp.After(cutoff) {
			kept = append(kept, timestamp)
		}
	}

	if len(kept) >= l.limit {
		l.requests[key] = kept
		return false
	}

	l.requests[key] = append(
		kept,
		now,
	)

	return true
}

func (l *DeviceRequestRateLimiter) Key(
	request *http.Request,
) string {
	if value := request.Header.Get("X-Request-ID"); value != "" {
		return value
	}

	host, _, err := net.SplitHostPort(
		request.RemoteAddr,
	)

	if err == nil && host != "" {
		return host
	}

	return request.RemoteAddr
}
