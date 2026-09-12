package service

import "net/http"

type DeviceApplicationV1Router struct {
	Query        *DeviceQueryHandlerV2
	Registration *DeviceRegistrationHandler
	Status       *DeviceStatusHandler
	Command      *DeviceCommandRequestHandler
}

func NewDeviceApplicationV1Router(
	query *DeviceQueryHandlerV2,
	registration *DeviceRegistrationHandler,
	status *DeviceStatusHandler,
	command *DeviceCommandRequestHandler,
) *DeviceApplicationV1Router {
	return &DeviceApplicationV1Router{
		Query:        query,
		Registration: registration,
		Status:       status,
		Command:      command,
	}
}

func (r *DeviceApplicationV1Router) Handler() http.Handler {
	mux := http.NewServeMux()

	mux.Handle(
		"/api/v1/devices/",
		r.Query,
	)

	mux.Handle(
		"/api/v1/register",
		r.Registration,
	)

	mux.Handle(
		"/api/v1/status",
		r.Status,
	)

	mux.Handle(
		"/api/v1/command",
		r.Command,
	)

	return mux
}
