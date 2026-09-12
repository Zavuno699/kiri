package service

import (
	"context"
	"time"
)

type DeviceGracefulShutdown struct {
	Timeout time.Duration
}

func NewDeviceGracefulShutdown(timeout time.Duration) *DeviceGracefulShutdown {
	if timeout <= 0 {
		timeout = 30 * time.Second
	}

	return &DeviceGracefulShutdown{
		Timeout: timeout,
	}
}

func (s *DeviceGracefulShutdown) Context(
	parent context.Context,
) (context.Context, context.CancelFunc) {
	return context.WithTimeout(parent, s.Timeout)
}
