package service

import (
	"context"
	"net/http"
)

type DeviceProductionHTTPServerLifecycle struct {
	Server *http.Server
}

func NewDeviceProductionHTTPServerLifecycle(
	address string,
	handler http.Handler,
) *DeviceProductionHTTPServerLifecycle {
	return &DeviceProductionHTTPServerLifecycle{
		Server: &http.Server{
			Addr:    address,
			Handler: handler,
		},
	}
}

func (l *DeviceProductionHTTPServerLifecycle) Start(
	context.Context,
) error {
	return l.Server.ListenAndServe()
}

func (l *DeviceProductionHTTPServerLifecycle) Stop(
	ctx context.Context,
) error {
	return l.Server.Shutdown(ctx)
}
