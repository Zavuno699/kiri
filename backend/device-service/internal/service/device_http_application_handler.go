package service

import (
	"encoding/json"
	"net/http"
)

type DeviceHTTPApplicationHandler struct {
	Application *DeviceApplicationOrchestrator
}

func NewDeviceHTTPApplicationHandler(
	application *DeviceApplicationOrchestrator,
) *DeviceHTTPApplicationHandler {
	return &DeviceHTTPApplicationHandler{
		Application: application,
	}
}

func (h *DeviceHTTPApplicationHandler) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request,
) {
	switch request.URL.Path {
	case "/devices/register":
		h.register(writer, request)

	case "/devices/command":
		h.command(writer, request)

	default:
		http.NotFound(writer, request)
	}
}

func (h *DeviceHTTPApplicationHandler) register(
	writer http.ResponseWriter,
	request *http.Request,
) {
	var input DeviceRecord

	if err := json.NewDecoder(request.Body).Decode(&input); err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	if err := h.Application.Register(
		request.Context(),
		input,
	); err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}

	writeDeviceApplicationJSON(
		writer,
		http.StatusCreated,
		map[string]any{
			"status": "registered",
			"id":     input.ID,
		},
	)
}

func (h *DeviceHTTPApplicationHandler) command(
	writer http.ResponseWriter,
	request *http.Request,
) {
	var input DeviceCommandRequest

	if err := json.NewDecoder(request.Body).Decode(&input); err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest)
		return
	}

	result, err := h.Application.ExecuteCommand(
		request.Context(),
		DeviceTransportRequest{
			DeviceID: input.DeviceID,
			Payload:  input.Payload,
		},
	)

	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadGateway)
		return
	}

	writeDeviceApplicationJSON(
		writer,
		http.StatusOK,
		DeviceCommandResponse{
			DeviceID: input.DeviceID,
			Command:  input.Command,
			Status:   "ok",
			Payload:  result.Payload,
		},
	)
}
