package service

import (
	"encoding/json"
	"net/http"
)

func writeDeviceApplicationJSON(
	writer http.ResponseWriter,
	status int,
	value any,
) {
	writer.Header().Set(
		"Content-Type",
		"application/json",
	)

	writer.WriteHeader(status)

	_ = json.NewEncoder(writer).Encode(value)
}
