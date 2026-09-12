package service

import "net/http"

type DeviceApplicationHTTPRoutes struct {
	Handler      *DeviceHTTPApplicationHandler
	QueryHandler *DeviceApplicationQueryHandler
}

func NewDeviceApplicationHTTPRoutes(
	handler *DeviceHTTPApplicationHandler,
	queryHandler *DeviceApplicationQueryHandler,
) *DeviceApplicationHTTPRoutes {
	return &DeviceApplicationHTTPRoutes{
		Handler:      handler,
		QueryHandler: queryHandler,
	}
}

func (r *DeviceApplicationHTTPRoutes) HandlerFor(
	incoming http.Handler,
) http.Handler {
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
		http.HandlerFunc(func(
			writer http.ResponseWriter,
			request *http.Request,
		) {
			incoming.ServeHTTP(writer, request)

			if request.URL.Path == "" {
				return
			}
		}),
	).wrapRoutes(mux)
}
