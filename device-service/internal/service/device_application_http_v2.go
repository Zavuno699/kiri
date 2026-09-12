package service

import (
	"encoding/json"
	"net/http"
)

type DeviceApplicationHTTPV2 struct {
	Services *DeviceApplicationAPIServices
}

func NewDeviceApplicationHTTPV2(
	services *DeviceApplicationAPIServices,
) *DeviceApplicationHTTPV2 {
	return &DeviceApplicationHTTPV2{
		Services: services,
	}
}

func (h *DeviceApplicationHTTPV2) Register(
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

	if err := h.Services.Registration.Register(
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
		DeviceQueryResponse{
			ID:     record.ID,
			Status: record.Status,
		},
	)
}

func (h *DeviceApplicationHTTPV2) Command(
	writer http.ResponseWriter,
	request *http.Request,
) {
	var input DeviceCommandRequest

	if err := json.NewDecoder(request.Body).Decode(&input); err != nil {
		writeDeviceHTTPError(
			writer,
			http.StatusBadRequest,
			"invalid_request",
			err.Error(),
		)
		return
	}

	response, err := h.Services.Command.Execute(
		request.Context(),
		input,
	)
	if err != nil {
		writeDeviceHTTPError(
			writer,
			http.StatusBadRequest,
			"command_failed",
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

func (h *DeviceApplicationHTTPV2) Query(
	writer http.ResponseWriter,
	request *http.Request,
	deviceID string,
) {
	response, err := h.Services.Query.Get(
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
