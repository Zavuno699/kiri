package service

import "net/http"

func DeviceAPIMetadataHandler(
	writer http.ResponseWriter,
	_ *http.Request,
) {
	writeDeviceApplicationJSON(
		writer,
		http.StatusOK,
		NewDeviceAPIMetadata(),
	)
}
