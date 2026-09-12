package service

import "net/http"

type DeviceHTTPMiddleware struct {
	Next http.Handler
}

func NewDeviceHTTPMiddleware(
	next http.Handler,
) *DeviceHTTPMiddleware {
	return &DeviceHTTPMiddleware{
		Next: next,
	}
}

func (m *DeviceHTTPMiddleware) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	requestID := deviceRequestID(request)

	writer.Header().Set(
		"X-Request-ID",
		requestID,
	)

	writer.Header().Set(
		"X-Content-Type-Options",
		"nosniff",
	)

	writer.Header().Set(
		"Cache-Control",
		"no-store",
	)

	m.Next.ServeHTTP(
		writer,
		request,
	)
}
