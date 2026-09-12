package service

import "net/http"

type DeviceFinalHTTPComposition struct {
	Routes  *DeviceFinalHTTPRoutes
	Handler http.Handler
}

func NewDeviceFinalHTTPComposition(
	routes *DeviceFinalHTTPRoutes,
) *DeviceFinalHTTPComposition {
	return &DeviceFinalHTTPComposition{
		Routes:  routes,
		Handler: routes.Handler(),
	}
}

func (c *DeviceFinalHTTPComposition) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	c.Handler.ServeHTTP(writer, request)
}
