package service

import (
	"encoding/json"
	"net/http"
)

type DeviceCommandHTTPV2 struct {
	Application *DeviceCommandStateOrchestrator
}

func NewDeviceCommandHTTPV2(
	application *DeviceCommandStateOrchestrator,
) *DeviceCommandHTTPV2 {
	return &DeviceCommandHTTPV2{
		Application: application,
	}
}

func (h *DeviceCommandHTTPV2) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	var input DeviceCommandRequest

	if err := json.NewDecoder(
		request.Body,
	).Decode(&input); err != nil {
		writeDeviceHTTPError(
			writer,
			http.StatusBadRequest,
			"invalid_request",
			err.Error(),
		)
		return
	}

	response, err := h.Application.Execute(
		request.Context(),
		input,
	)

	if err != nil {
		WriteDeviceServiceError(
			writer,
			err,
		)
		return
	}

	WriteDeviceServiceJSON(
		writer,
		http.StatusOK,
		response,
	)
}
