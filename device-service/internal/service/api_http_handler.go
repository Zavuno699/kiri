package service

import "net/http"

type DeviceAPIHTTPHandlerAdapter struct {
	Handler http.Handler
}

func NewDeviceAPIHTTPHandlerAdapter(
	handler http.Handler,
) *DeviceAPIHTTPHandlerAdapter {
	return &DeviceAPIHTTPHandlerAdapter{
		Handler: handler,
	}
}

func (a *DeviceAPIHTTPHandlerAdapter) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	a.Handler.ServeHTTP(
		writer,
		request,
	)
}
