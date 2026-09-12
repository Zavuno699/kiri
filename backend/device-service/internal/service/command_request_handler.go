package service

import (
	"encoding/json"
	"net/http"
)

type DeviceCommandRequestHandler struct {
	Worker *DeviceCommandWorkerRuntime
}

func NewDeviceCommandRequestHandler(
	worker *DeviceCommandWorkerRuntime,
) *DeviceCommandRequestHandler {
	return &DeviceCommandRequestHandler{
		Worker: worker,
	}
}

func (h *DeviceCommandRequestHandler) ServeHTTP(
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

	result, err := h.Worker.Execute(
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
		DeviceCommandResponse{
			DeviceID: result.DeviceID,
			Command:  result.Command,
			Status:   result.Status,
			Payload:  result.Payload,
		},
	)
}
