package service

import (
	"net/http"
	"strings"
)

type DeviceApplicationAPIRouter struct {
	API *DeviceApplicationHTTPV2
}

func NewDeviceApplicationAPIRouter(
	api *DeviceApplicationHTTPV2,
) *DeviceApplicationAPIRouter {
	return &DeviceApplicationAPIRouter{
		API: api,
	}
}

func (r *DeviceApplicationAPIRouter) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	switch {
	case request.Method == http.MethodPost &&
		request.URL.Path == "/devices/register":
		r.API.Register(writer, request)

	case request.Method == http.MethodPost &&
		request.URL.Path == "/devices/command":
		r.API.Command(writer, request)

	case request.Method == http.MethodGet &&
		strings.HasPrefix(request.URL.Path, "/devices/"):
		deviceID := strings.TrimPrefix(
			request.URL.Path,
			"/devices/",
		)
		r.API.Query(writer, request, deviceID)

	default:
		http.NotFound(writer, request)
	}
}
