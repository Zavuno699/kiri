package service

import (
	"net/http"
	"time"
)

func NewDeviceProductionHTTPChain(
	handler http.Handler,
	authenticator DeviceAuthenticator,
	logger DeviceServiceLogger,
) http.Handler {
	handler = NewDeviceHTTPMiddleware(
		handler,
	)

	handler = NewDeviceHTTPRequestContextMiddleware(
		handler,
	)

	handler = NewDeviceHTTPCORSMiddleware(
		handler,
	)

	handler = NewDeviceHTTPContentTypeMiddleware(
		handler,
	)

	handler = NewDeviceHTTPBodyLimitMiddleware(
		handler,
		NewDeviceHTTPLimits(1<<20),
	)

	handler = NewDeviceHTTPMethodMiddleware(
		handler,
		http.MethodGet,
		http.MethodPost,
		http.MethodOptions,
	)

	handler = NewDeviceHTTPTimeoutMiddleware(
		handler,
		15*time.Second,
	)

	handler = NewDeviceHTTPRequestLoggingMiddleware(
		handler,
		logger,
	)

	handler = NewDeviceHTTPAuthMiddleware(
		authenticator,
		handler,
	)

	handler = NewDeviceHTTPRecoveryMiddleware(
		handler,
	)

	return handler
}
