package service

import "net/http"

func (r *DeviceApplicationHTTPRoutes) RoutesHandler() http.Handler {
	mux := http.NewServeMux()

	mux.Handle(
		"/devices/register",
		r.Handler,
	)

	mux.Handle(
		"/devices/command",
		r.Handler,
	)

	mux.Handle(
		"/devices/",
		r.QueryHandler,
	)

	return NewDeviceHTTPMiddleware(
		mux,
	)
}
