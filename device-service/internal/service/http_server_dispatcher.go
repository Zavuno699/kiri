package service

import (
	"net/http"
)

type DeviceHealthHTTPDispatcher struct {
	Handler *DeviceHealthHTTPHandler
}

func NewDeviceHealthHTTPDispatcher(
	handler *DeviceHealthHTTPHandler,
) *DeviceHealthHTTPDispatcher {
	return &DeviceHealthHTTPDispatcher{
		Handler: handler,
	}
}

func (d *DeviceHealthHTTPDispatcher) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	if request.Method != http.MethodGet {
		http.Error(writer, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	switch request.URL.Path {
	case "/health/live":
		d.handleLiveness(writer)

	case "/health/ready":
		d.handleReadiness(writer)

	default:
		http.NotFound(writer, request)
	}
}

func (d *DeviceHealthHTTPDispatcher) handleLiveness(
	writer http.ResponseWriter,
) {
	response := d.Handler.Liveness()

	writeDeviceHTTPResponse(
		writer,
		response.Code,
		DeviceHTTPJSONResponse{
			Status: response.Body,
		},
	)
}

func (d *DeviceHealthHTTPDispatcher) handleReadiness(
	writer http.ResponseWriter,
) {
	response, err := d.Handler.Readiness()

	if err != nil {
		http.Error(
			writer,
			err.Error(),
			http.StatusServiceUnavailable,
		)
		return
	}

	writeDeviceHTTPResponse(
		writer,
		response.Code,
		DeviceHTTPJSONResponse{
			Status: response.Body,
			Checks: response.Checks,
		},
	)
}
