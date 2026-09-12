package service

import (
	"encoding/json"
	"net/http"
)

type DeviceSystemHealthHandler struct {
	Health *DeviceSystemHealth
}

func NewDeviceSystemHealthHandler(
	health *DeviceSystemHealth,
) *DeviceSystemHealthHandler {
	return &DeviceSystemHealthHandler{
		Health: health,
	}
}

func (h *DeviceSystemHealthHandler) ServeHTTP(
	writer http.ResponseWriter,
	_ *http.Request,
) {
	status := "not_ready"
	code := http.StatusServiceUnavailable

	if h.Health.Ready() {
		status = "ready"
		code = http.StatusOK
	}

	writer.Header().Set(
		"Content-Type",
		"application/json",
	)

	writer.WriteHeader(code)

	_ = json.NewEncoder(writer).Encode(
		map[string]any{
			"status": status,
		},
	)
}
