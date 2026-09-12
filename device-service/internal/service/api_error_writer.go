package service

import "net/http"

func WriteDeviceServiceError(
	writer http.ResponseWriter,
	err error,
) {
	if err == nil {
		return
	}

	status := DeviceHTTPStatusForError(err)

	code := "internal_error"

	var applicationError *DeviceApplicationError
	if ok := AsDeviceApplicationError(err, &applicationError); ok {
		code = applicationError.Code
	}

	writeDeviceHTTPError(
		writer,
		status,
		code,
		err.Error(),
	)
}
