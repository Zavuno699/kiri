package service

import (
	"context"
	"net/http"
)

type DeviceApplicationHTTPServer struct {
	Server *http.Server
}

func NewDeviceApplicationHTTPServer(
	address string,
	handler http.Handler,
) *DeviceApplicationHTTPServer {
	return &DeviceApplicationHTTPServer{
		Server: &http.Server{
			Addr:    address,
			Handler: handler,
		},
	}
}

func (s *DeviceApplicationHTTPServer) Start(
	context.Context,
) error {
	return s.Server.ListenAndServe()
}

func (s *DeviceApplicationHTTPServer) Stop(
	ctx context.Context,
) error {
	return s.Server.Shutdown(ctx)
}
