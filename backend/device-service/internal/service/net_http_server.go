package service

import (
	"context"
	"errors"
	"net/http"
	"sync"
)

type DeviceNetHTTPServer struct {
	config     DeviceHTTPServerConfig
	dispatcher *DeviceHealthHTTPDispatcher

	mu      sync.Mutex
	server  *http.Server
	started bool
}

func NewDeviceNetHTTPServer(
	config DeviceHTTPServerConfig,
	dispatcher *DeviceHealthHTTPDispatcher,
) *DeviceNetHTTPServer {
	return &DeviceNetHTTPServer{
		config:     config,
		dispatcher: dispatcher,
	}
}

func (s *DeviceNetHTTPServer) Start(
	context.Context,
) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if s.started {
		return errors.New("HTTP server already started")
	}

	s.server = &http.Server{
		Addr:    s.config.Addr(),
		Handler: s.dispatcher,
	}

	s.started = true

	server := s.server

	go func() {
		err := server.ListenAndServe()

		if err != nil && !errors.Is(err, http.ErrServerClosed) {
			return
		}
	}()

	return nil
}

func (s *DeviceNetHTTPServer) Stop(
	ctx context.Context,
) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if !s.started || s.server == nil {
		return errors.New("HTTP server not started")
	}

	err := s.server.Shutdown(ctx)

	s.server = nil
	s.started = false

	return err
}
