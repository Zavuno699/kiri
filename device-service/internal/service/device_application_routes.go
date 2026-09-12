package service

import "net/http"

func NewDeviceApplicationRoutes(
	handler *DeviceHTTPApplicationHandler,
) http.Handler {
	mux := http.NewServeMux()

	mux.Handle(
		"/devices/register",
		handler,
	)

	mux.Handle(
		"/devices/command",
		handler,
	)

	return mux
}
