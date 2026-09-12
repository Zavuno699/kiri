package service

import "net/http"

type DeviceLifecycleRoutes struct {
	Handler *DeviceLifecycleHandler
}

func NewDeviceLifecycleRoutes(
	handler *DeviceLifecycleHandler,
) *DeviceLifecycleRoutes {
	return &DeviceLifecycleRoutes{
		Handler: handler,
	}
}

func (r *DeviceLifecycleRoutes) HandlerHTTP() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc(
		"/api/v1/lifecycle/register",
		r.Handler.Register,
	)

	mux.HandleFunc(
		"/api/v1/lifecycle/connect",
		r.Handler.Connect,
	)

	mux.HandleFunc(
		"/api/v1/lifecycle/disconnect",
		r.Handler.Disconnect,
	)

	return mux
}
