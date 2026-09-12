package service

import "net/http"

type DeviceLivenessHandler struct {
	Service *DeviceLivenessService
}

func NewDeviceLivenessHandler(
	service *DeviceLivenessService,
) *DeviceLivenessHandler {
	return &DeviceLivenessHandler{
		Service: service,
	}
}

func (h *DeviceLivenessHandler) ServeHTTP(
	writer http.ResponseWriter,
	_ *http.Request,
) {
	if !h.Service.Alive() {
		WriteDeviceServiceJSON(
			writer,
			http.StatusServiceUnavailable,
			map[string]string{
				"status": "not_alive",
			},
		)
		return
	}

	WriteDeviceServiceJSON(
		writer,
		http.StatusOK,
		map[string]string{
			"status": "ok",
		},
	)
}
