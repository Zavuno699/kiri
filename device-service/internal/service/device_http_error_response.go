package service

import (
	"encoding/json"
	"net/http"
)

type DeviceHTTPErrorResponse struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

func writeDeviceHTTPError(
	writer http.ResponseWriter,
	status int,
	code string,
	message string,
) {
	writer.Header().Set(
		"Content-Type",
		"application/json",
	)

	writer.WriteHeader(status)

	_ = json.NewEncoder(writer).Encode(
		DeviceHTTPErrorResponse{
			Code:    code,
			Message: message,
		},
	)
}
