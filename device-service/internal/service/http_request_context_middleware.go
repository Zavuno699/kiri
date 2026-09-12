package service

import (
	"net/http"
	"time"
)

type DeviceHTTPRequestContextMiddleware struct {
	Next http.Handler
}

func NewDeviceHTTPRequestContextMiddleware(
	next http.Handler,
) *DeviceHTTPRequestContextMiddleware {
	return &DeviceHTTPRequestContextMiddleware{
		Next: next,
	}
}

func (m *DeviceHTTPRequestContextMiddleware) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	requestContext := DeviceRequestContext{
		RequestID: request.Header.Get("X-Request-ID"),
		StartedAt: time.Now(),
	}

	ctx := WithDeviceRequestContext(
		request.Context(),
		requestContext,
	)

	m.Next.ServeHTTP(
		writer,
		request.WithContext(ctx),
	)
}
