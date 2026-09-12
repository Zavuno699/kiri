package service

import "net/http"

type DeviceHTTPCORSMiddleware struct {
	Next http.Handler
}

func NewDeviceHTTPCORSMiddleware(
	next http.Handler,
) *DeviceHTTPCORSMiddleware {
	return &DeviceHTTPCORSMiddleware{
		Next: next,
	}
}

func (m *DeviceHTTPCORSMiddleware) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	writer.Header().Set(
		"Access-Control-Allow-Origin",
		"*",
	)

	writer.Header().Set(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization, X-Request-ID",
	)

	writer.Header().Set(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS",
	)

	if request.Method == http.MethodOptions {
		writer.WriteHeader(http.StatusNoContent)
		return
	}

	m.Next.ServeHTTP(
		writer,
		request,
	)
}
