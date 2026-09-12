package service

import (
	"net/http"
	"strings"
)

type DeviceStateQueryHandler struct {
	Application *DeviceStateQueryApplication
}

func NewDeviceStateQueryHandler(
	application *DeviceStateQueryApplication,
) *DeviceStateQueryHandler {
	return &DeviceStateQueryHandler{
		Application: application,
	}
}

func (h *DeviceStateQueryHandler) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	deviceID := strings.TrimPrefix(
		request.URL.Path,
		"/api/v1/devices/",
	)

	if deviceID == "" {
		writeDeviceHTTPError(
			writer,
			http.StatusBadRequest,
			"invalid_device_id",
			"device ID is required",
		)
		return
	}

	response, err := h.Application.Get(
		request.Context(),
		deviceID,
	)
	if err != nil {
		WriteDeviceServiceError(writer, err)
		return
	}

	WriteDeviceServiceJSON(
		writer,
		http.StatusOK,
		response,
	)
}
