package service

import "net/http"

type DeviceStateRoutes struct {
	Command      http.Handler
	Registration http.Handler
}

func NewDeviceStateRoutes(
	command http.Handler,
	registration http.Handler,
) *DeviceStateRoutes {
	return &DeviceStateRoutes{
		Command:      command,
		Registration: registration,
	}
}

func (r *DeviceStateRoutes) Handler() http.Handler {
	mux := http.NewServeMux()

	mux.Handle(
		"/api/v1/command",
		r.Command,
	)

	mux.Handle(
		"/api/v1/register",
		r.Registration,
	)

	return mux
}
