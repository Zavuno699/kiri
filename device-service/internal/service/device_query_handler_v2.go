package service

import (
	"net/http"
	"strings"
)

type DeviceQueryHandlerV2 struct {
	Application *DeviceQueryApplication
}

func NewDeviceQueryHandlerV2(
	application *DeviceQueryApplication,
) *DeviceQueryHandlerV2 {
	return &DeviceQueryHandlerV2{
		Application: application,
	}
}

func (h *DeviceQueryHandlerV2) ServeHTTP(
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
		response,
	)
}
