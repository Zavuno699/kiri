package service

import (
	"log"
	"net/http"
)

type DeviceHTTPRecoveryMiddleware struct {
	Next http.Handler
}

func NewDeviceHTTPRecoveryMiddleware(
	next http.Handler,
) *DeviceHTTPRecoveryMiddleware {
	return &DeviceHTTPRecoveryMiddleware{
		Next: next,
	}
}

func (m *DeviceHTTPRecoveryMiddleware) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	defer func() {
		if recovered := recover(); recovered != nil {
			log.Printf(
				"device HTTP panic: %v",
				recovered,
			)

			writeDeviceHTTPError(
				writer,
				http.StatusInternalServerError,
				"internal_error",
				"internal server error",
			)
		}
	}()

	m.Next.ServeHTTP(
		writer,
		request,
	)
}
