package service

import (
	"encoding/json"
	"net/http"
)

type DeviceRegistrationHandler struct {
	Application *DeviceRegistrationApplication
}

func NewDeviceRegistrationHandler(
	application *DeviceRegistrationApplication,
) *DeviceRegistrationHandler {
	return &DeviceRegistrationHandler{
		Application: application,
	}
}

func (h *DeviceRegistrationHandler) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	var record DeviceRecord

	if err := json.NewDecoder(request.Body).Decode(&record); err != nil {
		writeDeviceHTTPError(
			writer,
			http.StatusBadRequest,
			"invalid_request",
			err.Error(),
		)
		return
	}

	if err := h.Application.Register(
		request.Context(),
		record,
	); err != nil {
		writeDeviceHTTPError(
			writer,
			http.StatusBadRequest,
			"registration_failed",
			err.Error(),
		)
		return
	}

	writeDeviceApplicationJSON(
		writer,
		http.StatusCreated,
		DeviceRegistrationResponse{
			ID:     record.ID,
			Status: record.Status,
		},
	)
}
