package service

import (
	"context"
	"net/http"
)

type DeviceAPIServer struct {
	Server *http.Server
}

func NewDeviceAPIServer(
	address string,
	handler http.Handler,
) *DeviceAPIServer {
	return &DeviceAPIServer{
		Server: &http.Server{
			Addr:    address,
			Handler: handler,
		},
	}
}

func (s *DeviceAPIServer) Start(
	context.Context,
) error {
	return s.Server.ListenAndServe()
}

func (s *DeviceAPIServer) Stop(
	ctx context.Context,
) error {
	return s.Server.Shutdown(ctx)
}
