package service

import "net/http"

type DeviceServiceAPIRouter struct {
	API         *DeviceAPIComposition
	Health      *DeviceServiceHealthRouter
	Diagnostics *DeviceServiceDiagnosticsRouter
}

func NewDeviceServiceAPIRouter(
	api *DeviceAPIComposition,
	health *DeviceServiceHealthRouter,
	diagnostics *DeviceServiceDiagnosticsRouter,
) *DeviceServiceAPIRouter {
	return &DeviceServiceAPIRouter{
		API:         api,
		Health:      health,
		Diagnostics: diagnostics,
	}
}

func (r *DeviceServiceAPIRouter) Handler() http.Handler {
	mux := http.NewServeMux()

	mux.Handle(
		"/devices/",
		r.API.Handler(),
	)

	mux.Handle(
		"/health/",
		r.Health.Handler(),
	)

	mux.Handle(
		"/diagnostics",
		r.Diagnostics.Handler(),
	)

	return mux
}
