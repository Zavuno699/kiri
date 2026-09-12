package service

import "net/http"

type DeviceCommandWorkerRoutes struct {
	Handler *DeviceCommandRequestHandler
}

func NewDeviceCommandWorkerRoutes(
	handler *DeviceCommandRequestHandler,
) *DeviceCommandWorkerRoutes {
	return &DeviceCommandWorkerRoutes{
		Handler: handler,
	}
}

func (r *DeviceCommandWorkerRoutes) HandlerHTTP() http.Handler {
	mux := http.NewServeMux()

	mux.Handle(
		"/devices/execute",
		r.Handler,
	)

	return mux
}
