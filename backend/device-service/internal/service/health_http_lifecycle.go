package service

import (
	"context"
	"errors"
	"sync"
)

type DeviceHealthHTTPLifecycle struct {
	server DeviceHealthHTTPServer

	mu      sync.Mutex
	started bool
}

func NewDeviceHealthHTTPLifecycle(
	server DeviceHealthHTTPServer,
) *DeviceHealthHTTPLifecycle {
	return &DeviceHealthHTTPLifecycle{
		server: server,
	}
}

func (l *DeviceHealthHTTPLifecycle) Start(
	context.Context,
) error {
	l.mu.Lock()
	defer l.mu.Unlock()

	if l.started {
		return errors.New("health HTTP lifecycle already started")
	}

	l.started = true

	return nil
}

func (l *DeviceHealthHTTPLifecycle) Stop(
	context.Context,
) error {
	l.mu.Lock()
	defer l.mu.Unlock()

	if !l.started {
		return errors.New("health HTTP lifecycle not started")
	}

	l.started = false

	return nil
}
