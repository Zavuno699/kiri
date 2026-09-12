package service

import (
	"net/http"
	"time"
)

type DeviceHTTPTimeoutMiddleware struct {
	Next    http.Handler
	Timeout time.Duration
}

func NewDeviceHTTPTimeoutMiddleware(
	next http.Handler,
	timeout time.Duration,
) *DeviceHTTPTimeoutMiddleware {
	if timeout <= 0 {
		timeout = 15 * time.Second
	}

	return &DeviceHTTPTimeoutMiddleware{
		Next:    next,
		Timeout: timeout,
	}
}

func (m *DeviceHTTPTimeoutMiddleware) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	handler := http.TimeoutHandler(
		m.Next,
		m.Timeout,
		`{"code":"request_timeout","message":"request timed out"}`,
	)

	handler.ServeHTTP(
		writer,
		request,
	)
}
