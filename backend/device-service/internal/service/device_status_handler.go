package service

import (
	"encoding/json"
	"net/http"
)

type DeviceStatusUpdateRequest struct {
	Status string `json:"status"`
}

type DeviceStatusHandler struct {
	Application *DeviceStatusApplication
}

func NewDeviceStatusHandler(
	application *DeviceStatusApplication,
) *DeviceStatusHandler {
	return &DeviceStatusHandler{
		Application: application,
	}
}

func (h *DeviceStatusHandler) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	var input DeviceStatusUpdateRequest

	if err := json.NewDecoder(request.Body).Decode(&input); err != nil {
		writeDeviceHTTPError(
			writer,
			http.StatusBadRequest,
			"invalid_request",
			err.Error(),
		)
		return
	}

	deviceID := request.URL.Query().Get("device_id")

	if deviceID == "" {
		writeDeviceHTTPError(
			writer,
			http.StatusBadRequest,
			"invalid_device_id",
			"device ID is required",
		)
		return
	}

	if err := h.Application.Update(
		request.Context(),
		deviceID,
		input.Status,
	); err != nil {
		writeDeviceHTTPError(
			writer,
			http.StatusBadRequest,
			"status_update_failed",
			err.Error(),
		)
		return
	}

	writeDeviceApplicationJSON(
		writer,
		http.StatusOK,
		map[string]any{
			"id":     deviceID,
			"status": input.Status,
		},
	)
}
