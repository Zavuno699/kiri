package service

import (
	"encoding/json"
	"net/http"
)

type DeviceRegistrationHTTPV2 struct {
	Application *DeviceRegistrationOrchestrator
}

func NewDeviceRegistrationHTTPV2(
	application *DeviceRegistrationOrchestrator,
) *DeviceRegistrationHTTPV2 {
	return &DeviceRegistrationHTTPV2{
		Application: application,
	}
}

func (h *DeviceRegistrationHTTPV2) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	var record DeviceRecord

	if err := json.NewDecoder(
		request.Body,
	).Decode(&record); err != nil {
		WriteDeviceServiceJSON(
			writer,
			http.StatusBadRequest,
			DeviceHTTPErrorResponse{
				Code:    "invalid_request",
				Message: err.Error(),
			},
		)
		return
	}

	if err := h.Application.Register(
		request.Context(),
		record,
	); err != nil {
		WriteDeviceServiceError(
			writer,
			err,
		)
		return
	}

	WriteDeviceServiceJSON(
		writer,
		http.StatusCreated,
		DeviceRegistrationResponse{
			ID:     record.ID,
			Status: DeviceStatusRegistered,
		},
	)
}
