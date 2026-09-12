package service

import "net/http"

type DeviceReadinessHandler struct {
	Service *DeviceReadinessService
}

func NewDeviceReadinessHandler(
	service *DeviceReadinessService,
) *DeviceReadinessHandler {
	return &DeviceReadinessHandler{
		Service: service,
	}
}

func (h *DeviceReadinessHandler) ServeHTTP(
	writer http.ResponseWriter,
	_ *http.Request,
) {
	if !h.Service.Ready() {
		WriteDeviceServiceJSON(
			writer,
			http.StatusServiceUnavailable,
			map[string]string{
				"status": "not_ready",
			},
		)
		return
	}

	WriteDeviceServiceJSON(
		writer,
		http.StatusOK,
		map[string]string{
			"status": "ready",
		},
	)
}
