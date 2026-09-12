package service

import (
	"encoding/json"
	"net/http"
)

type DeviceLifecycleHandler struct {
	Application *DeviceLifecycleApplication
}

func NewDeviceLifecycleHandler(
	application *DeviceLifecycleApplication,
) *DeviceLifecycleHandler {
	return &DeviceLifecycleHandler{
		Application: application,
	}
}

func (h *DeviceLifecycleHandler) decode(
	writer http.ResponseWriter,
	request *http.Request,
) (DeviceLifecycleRequest, bool) {
	var input DeviceLifecycleRequest

	if err := json.NewDecoder(request.Body).Decode(&input); err != nil {
		WriteDeviceServiceJSON(
			writer,
			http.StatusBadRequest,
			DeviceHTTPErrorResponse{
				Code:    "invalid_request",
				Message: err.Error(),
			},
		)
		return DeviceLifecycleRequest{}, false
	}

	if input.DeviceID == "" {
		WriteDeviceServiceJSON(
			writer,
			http.StatusBadRequest,
			DeviceHTTPErrorResponse{
				Code:    "invalid_device_id",
				Message: "device ID is required",
			},
		)
		return DeviceLifecycleRequest{}, false
	}

	return input, true
}

func (h *DeviceLifecycleHandler) Register(
	writer http.ResponseWriter,
	request *http.Request,
) {
	input, ok := h.decode(writer, request)
	if !ok {
		return
	}

	if err := h.Application.Register(
		request.Context(),
		input.DeviceID,
	); err != nil {
		WriteDeviceServiceError(writer, err)
		return
	}

	WriteDeviceServiceJSON(
		writer,
		http.StatusOK,
		map[string]string{
			"id":     input.DeviceID,
			"status": DeviceStatusRegistered,
		},
	)
}

func (h *DeviceLifecycleHandler) Connect(
	writer http.ResponseWriter,
	request *http.Request,
) {
	input, ok := h.decode(writer, request)
	if !ok {
		return
	}

	if err := h.Application.Connect(
		request.Context(),
		input.DeviceID,
	); err != nil {
		WriteDeviceServiceError(writer, err)
		return
	}

	WriteDeviceServiceJSON(
		writer,
		http.StatusOK,
		map[string]string{
			"id":     input.DeviceID,
			"status": DeviceStatusReady,
		},
	)
}

func (h *DeviceLifecycleHandler) Disconnect(
	writer http.ResponseWriter,
	request *http.Request,
) {
	input, ok := h.decode(writer, request)
	if !ok {
		return
	}

	if err := h.Application.Disconnect(
		request.Context(),
		input.DeviceID,
	); err != nil {
		WriteDeviceServiceError(writer, err)
		return
	}

	WriteDeviceServiceJSON(
		writer,
		http.StatusOK,
		map[string]string{
			"id":     input.DeviceID,
			"status": DeviceStatusDisconnected,
		},
	)
}
