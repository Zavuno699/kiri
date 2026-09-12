package service

import (
	"context"
	"errors"
	"net/http"
)

type DeviceServiceAPIServer struct {
	Server  *http.Server
	started bool
}

func NewDeviceServiceAPIServer(
	address string,
	handler http.Handler,
) *DeviceServiceAPIServer {
	return &DeviceServiceAPIServer{
		Server: &http.Server{
			Addr:    address,
			Handler: handler,
		},
	}
}

func (s *DeviceServiceAPIServer) Start(
	context.Context,
) error {
	if s.started {
		return errors.New("API server already started")
	}

	s.started = true

	go func() {
		_ = s.Server.ListenAndServe()
	}()

	return nil
}

func (s *DeviceServiceAPIServer) Stop(
	ctx context.Context,
) error {
	if !s.started {
		return nil
	}

	s.started = false

	return s.Server.Shutdown(ctx)
}
