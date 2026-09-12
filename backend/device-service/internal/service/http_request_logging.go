package service

import (
	"log"
	"net/http"
	"time"
)

type DeviceHTTPRequestLoggingMiddleware struct {
	Next   http.Handler
	Logger DeviceServiceLogger
}

func NewDeviceHTTPRequestLoggingMiddleware(
	next http.Handler,
	logger DeviceServiceLogger,
) *DeviceHTTPRequestLoggingMiddleware {
	return &DeviceHTTPRequestLoggingMiddleware{
		Next:   next,
		Logger: logger,
	}
}

func (m *DeviceHTTPRequestLoggingMiddleware) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	startedAt := time.Now()

	defer func() {
		duration := time.Since(startedAt)

		message := request.Method +
			" " +
			request.URL.Path +
			" " +
			duration.String()

		if m.Logger != nil {
			m.Logger.Info(message)
			return
		}

		log.Print(message)
	}()

	m.Next.ServeHTTP(
		writer,
		request,
	)
}
