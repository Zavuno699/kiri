package service

import (
	"encoding/json"
	"net/http"
)

func WriteDeviceServiceJSON(
	writer http.ResponseWriter,
	status int,
	value any,
) {
	WriteDeviceAPIHeaders(writer)

	writer.WriteHeader(status)

	_ = json.NewEncoder(writer).Encode(value)
}
