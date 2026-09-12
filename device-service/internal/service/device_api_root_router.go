package service

import "net/http"

type DeviceAPIRootRouter struct {
	V1 *DeviceApplicationV1Composition
}

func NewDeviceAPIRootRouter(
	v1 *DeviceApplicationV1Composition,
) *DeviceAPIRootRouter {
	return &DeviceAPIRootRouter{
		V1: v1,
	}
}

func (r *DeviceAPIRootRouter) Handler() http.Handler {
	mux := http.NewServeMux()

	mux.Handle(
		"/api/v1/",
		r.V1.Handler(),
	)

	mux.HandleFunc(
		"/api",
		DeviceAPIMetadataHandler,
	)

	mux.HandleFunc(
		"/api/health",
		DeviceAPIHealthHandler,
	)

	return mux
}
