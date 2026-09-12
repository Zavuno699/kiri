package service

import "net/http"

func DeviceAPIHealthHandler(
	writer http.ResponseWriter,
	_ *http.Request,
) {
	writeDeviceApplicationJSON(
		writer,
		http.StatusOK,
		map[string]string{
			"status": "ok",
		},
	)
}
