package service

import (
	"errors"
	"net/http"
)

func DeviceHTTPStatusForError(err error) int {
	if err == nil {
		return http.StatusOK
	}

	var applicationError *DeviceApplicationError
	if errors.As(err, &applicationError) {
		switch applicationError.Code {
		case "unauthorized":
			return http.StatusUnauthorized

		case "forbidden":
			return http.StatusForbidden

		case "invalid_request",
			"invalid_device_id",
			"invalid_command":
			return http.StatusBadRequest

		case "device_not_found":
			return http.StatusNotFound

		case "not_ready":
			return http.StatusServiceUnavailable
		}
	}

	return http.StatusInternalServerError
}
