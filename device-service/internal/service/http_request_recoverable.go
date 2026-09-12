package service

import "net/http"

func NewDeviceRecoverableHTTPHandler(
	handler http.Handler,
) http.Handler {
	return NewDeviceHTTPRecoveryMiddleware(
		handler,
	)
}
