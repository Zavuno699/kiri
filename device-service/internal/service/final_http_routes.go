package service

import "net/http"

type DeviceFinalHTTPRoutes struct {
	API         http.Handler
	Health      http.Handler
	Diagnostics http.Handler
	Metrics     http.Handler
}

func NewDeviceFinalHTTPRoutes(
	api http.Handler,
	health http.Handler,
	diagnostics http.Handler,
	metrics http.Handler,
) *DeviceFinalHTTPRoutes {
	return &DeviceFinalHTTPRoutes{
		API:         api,
		Health:      health,
		Diagnostics: diagnostics,
		Metrics:     metrics,
	}
}

func (r *DeviceFinalHTTPRoutes) Handler() http.Handler {
	mux := http.NewServeMux()

	mux.Handle("/api/", r.API)
	mux.Handle("/health/", r.Health)
	mux.Handle("/diagnostics", r.Diagnostics)
	mux.Handle("/metrics", r.Metrics)

	return mux
}
