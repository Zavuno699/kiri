package service

import (
	"net/http"
	"time"
)

func NewDeviceHTTPGovernanceChain(
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

	handler = NewDeviceHTTPRateLimitMiddleware(
		handler,
		NewDeviceRequestRateLimiter(
			120,
			time.Minute,
		),
	)

	handler = NewDeviceHTTPTimeoutMiddleware(
		handler,
		15*time.Second,
	)

	handler = NewDeviceHTTPRecoveryMiddleware(
		handler,
	)

	handler = NewDeviceHTTPRequestLoggingMiddleware(
		handler,
		logger,
	)

	handler = NewDeviceHTTPAuthMiddleware(
		authenticator,
		handler,
	)

	handler = NewDeviceHTTPIdempotencyMiddleware(
		handler,
	)

	return handler
}
