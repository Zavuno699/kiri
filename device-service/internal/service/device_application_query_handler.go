package service

import (
	"net/http"
	"strings"
)

type DeviceApplicationQueryHandler struct {
	Query *DeviceApplicationQueryController
}

func NewDeviceApplicationQueryHandler(
	query *DeviceApplicationQueryController,
) *DeviceApplicationQueryHandler {
	return &DeviceApplicationQueryHandler{
		Query: query,
	}
}

func (h *DeviceApplicationQueryHandler) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	deviceID := strings.TrimPrefix(
		request.URL.Path,
		"/devices/",
	)

	record, err := h.Query.Get(
		request.Context(),
		deviceID,
	)

	if err != nil {
		writeDeviceHTTPError(
			writer,
			http.StatusNotFound,
			"device_not_found",
			err.Error(),
		)
		return
	}

	writeDeviceApplicationJSON(
		writer,
		http.StatusOK,
		DeviceQueryResponse{
			ID:     record.ID,
			Status: record.Status,
		},
	)
}
