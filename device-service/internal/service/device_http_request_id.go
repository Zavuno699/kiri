package service

import (
	"net/http"
	"strconv"
	"sync/atomic"
)

var deviceRequestSequence uint64

func deviceRequestID(
	request *http.Request,
) string {
	if value := request.Header.Get("X-Request-ID"); value != "" {
		return value
	}

	value := atomic.AddUint64(
		&deviceRequestSequence,
		1,
	)

	return "device-" + strconv.FormatUint(value, 10)
}
