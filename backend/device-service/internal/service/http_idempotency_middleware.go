package service

import "net/http"

type DeviceHTTPIdempotencyMiddleware struct {
	Next http.Handler
}

func NewDeviceHTTPIdempotencyMiddleware(
	next http.Handler,
) *DeviceHTTPIdempotencyMiddleware {
	return &DeviceHTTPIdempotencyMiddleware{
		Next: next,
	}
}

func (m *DeviceHTTPIdempotencyMiddleware) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	if request.Method == http.MethodPost {
		key := request.Header.Get(
			"Idempotency-Key",
		)

		if key != "" {
			request.Header.Set(
				"X-Idempotency-Key",
				key,
			)
		}
	}

	m.Next.ServeHTTP(
		writer,
		request,
	)
}
