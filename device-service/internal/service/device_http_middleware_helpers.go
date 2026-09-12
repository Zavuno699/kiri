package service

import "net/http"

func (m *DeviceHTTPMiddleware) wrapRoutes(
	next http.Handler,
) http.Handler {
	return &DeviceHTTPMiddleware{
		Next: next,
	}
}
