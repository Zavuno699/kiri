package service

import (
	"net/http"
	"strings"
)

func RequireMethod(
	request *http.Request,
	method string,
) bool {
	return request != nil &&
		request.Method == method
}

func PathDeviceID(
	request *http.Request,
	prefix string,
) string {
	if request == nil {
		return ""
	}

	return strings.TrimPrefix(
		request.URL.Path,
		prefix,
	)
}
