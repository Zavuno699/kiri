package service

import (
	"encoding/json"
	"net/http"
)

type DeviceDiagnosticsHandler struct {
	Diagnostics *DeviceDiagnostics
}

func NewDeviceDiagnosticsHandler(
	diagnostics *DeviceDiagnostics,
) *DeviceDiagnosticsHandler {
	return &DeviceDiagnosticsHandler{
		Diagnostics: diagnostics,
	}
}

func (h *DeviceDiagnosticsHandler) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	snapshot, err := h.Diagnostics.Snapshot(
		request.Context(),
	)

	if err != nil {
		writer.Header().Set(
			"Content-Type",
			"application/json",
		)
		writer.WriteHeader(http.StatusServiceUnavailable)
		_ = json.NewEncoder(writer).Encode(snapshot)
		return
	}

	writer.Header().Set(
		"Content-Type",
		"application/json",
	)

	writer.WriteHeader(http.StatusOK)

	_ = json.NewEncoder(writer).Encode(snapshot)
}
