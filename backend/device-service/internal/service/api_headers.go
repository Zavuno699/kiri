package service

import "net/http"

func WriteDeviceAPIHeaders(
	writer http.ResponseWriter,
) {
	writer.Header().Set(
		"Content-Type",
		"application/json",
	)

	writer.Header().Set(
		"Cache-Control",
		"no-store",
	)

	writer.Header().Set(
		"X-Content-Type-Options",
		"nosniff",
	)
}
