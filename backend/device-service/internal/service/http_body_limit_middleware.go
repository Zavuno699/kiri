package service

import "net/http"

type DeviceHTTPBodyLimitMiddleware struct {
	Next   http.Handler
	Limits DeviceHTTPLimits
}

func NewDeviceHTTPBodyLimitMiddleware(
	next http.Handler,
	limits DeviceHTTPLimits,
) *DeviceHTTPBodyLimitMiddleware {
	return &DeviceHTTPBodyLimitMiddleware{
		Next:   next,
		Limits: limits,
	}
}

func (m *DeviceHTTPBodyLimitMiddleware) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	request.Body = http.MaxBytesReader(
		writer,
		request.Body,
		m.Limits.MaxBodyBytes,
	)

	m.Next.ServeHTTP(
		writer,
		request,
	)
}
