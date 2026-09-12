package service

import "net/http"

func NewDeviceProductionHTTPMiddleware(
	handler http.Handler,
	authenticator DeviceAuthenticator,
) http.Handler {
	handler = NewDeviceHTTPMiddleware(handler)
	handler = NewDeviceHTTPRequestContextMiddleware(handler)
	handler = NewDeviceHTTPCORSMiddleware(handler)
	handler = NewDeviceHTTPRecoveryMiddleware(handler)
	handler = NewDeviceHTTPAuthMiddleware(
		authenticator,
		handler,
	)

	return handler
}
