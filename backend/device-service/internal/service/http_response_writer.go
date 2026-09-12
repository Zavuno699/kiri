package service

import (
	"encoding/json"
	"net/http"
)

func writeDeviceHTTPResponse(
	writer http.ResponseWriter,
	code int,
	body DeviceHTTPJSONResponse,
) {
	writer.Header().Set(
		"Content-Type",
		"application/json",
	)

	writer.WriteHeader(code)

	_ = json.NewEncoder(writer).Encode(body)
}
