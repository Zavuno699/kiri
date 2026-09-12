package service

import (
	"net/http"
	"time"
)

type DeviceHTTPRateLimitMiddleware struct {
	Next    http.Handler
	Limiter *DeviceRequestRateLimiter
}

func NewDeviceHTTPRateLimitMiddleware(
	next http.Handler,
	limiter *DeviceRequestRateLimiter,
) *DeviceHTTPRateLimitMiddleware {
	return &DeviceHTTPRateLimitMiddleware{
		Next:    next,
		Limiter: limiter,
	}
}

func (m *DeviceHTTPRateLimitMiddleware) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	key := m.Limiter.Key(request)

	if !m.Limiter.Allow(
		key,
		time.Now(),
	) {
		writer.Header().Set(
			"Retry-After",
			"60",
		)

		writeDeviceHTTPError(
			writer,
			http.StatusTooManyRequests,
			"rate_limited",
			"request rate exceeded",
		)
		return
	}

	m.Next.ServeHTTP(
		writer,
		request,
	)
}
