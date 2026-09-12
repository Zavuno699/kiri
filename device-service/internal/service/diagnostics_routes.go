package service

import "net/http"

type DeviceDiagnosticsRoutes struct {
	Diagnostics *DeviceDiagnosticsHandler
	Metrics     *DeviceMetricsHandler
}

func NewDeviceDiagnosticsRoutes(
	diagnostics *DeviceDiagnosticsHandler,
	metrics *DeviceMetricsHandler,
) *DeviceDiagnosticsRoutes {
	return &DeviceDiagnosticsRoutes{
		Diagnostics: diagnostics,
		Metrics:     metrics,
	}
}

func (r *DeviceDiagnosticsRoutes) Handler() http.Handler {
	mux := http.NewServeMux()

	mux.Handle(
		"/diagnostics",
		r.Diagnostics,
	)

	mux.Handle(
		"/metrics",
		r.Metrics,
	)

	return mux
}
