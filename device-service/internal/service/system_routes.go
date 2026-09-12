package service

import "net/http"

type DeviceSystemRoutes struct {
	Health http.Handler
}

func NewDeviceSystemRoutes(
	health http.Handler,
) *DeviceSystemRoutes {
	return &DeviceSystemRoutes{
		Health: health,
	}
}

func (r *DeviceSystemRoutes) Handler() http.Handler {
	mux := http.NewServeMux()

	mux.Handle(
		"/system/health",
		r.Health,
	)

	return mux
}
