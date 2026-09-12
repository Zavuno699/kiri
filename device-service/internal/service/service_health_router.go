package service

import "net/http"

type DeviceServiceHealthRouter struct {
	Routes *DeviceServiceHealthRoutes
}

func NewDeviceServiceHealthRouter(
	routes *DeviceServiceHealthRoutes,
) *DeviceServiceHealthRouter {
	return &DeviceServiceHealthRouter{
		Routes: routes,
	}
}

func (r *DeviceServiceHealthRouter) Handler() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc(
		"/health/live",
		r.Routes.Liveness,
	)

	mux.HandleFunc(
		"/health/ready",
		r.Routes.Readiness,
	)

	return mux
}
