package service

import "net/http"

type DeviceServiceDiagnosticsRouter struct {
	Routes *DeviceDiagnosticsRoutes
}

func NewDeviceServiceDiagnosticsRouter(
	routes *DeviceDiagnosticsRoutes,
) *DeviceServiceDiagnosticsRouter {
	return &DeviceServiceDiagnosticsRouter{
		Routes: routes,
	}
}

func (r *DeviceServiceDiagnosticsRouter) Handler() http.Handler {
	return r.Routes.Handler()
}
