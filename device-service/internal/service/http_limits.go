package service

import "net/http"

type DeviceHTTPLimits struct {
	MaxBodyBytes int64
}

func NewDeviceHTTPLimits(
	maxBodyBytes int64,
) DeviceHTTPLimits {
	if maxBodyBytes <= 0 {
		maxBodyBytes = 1 << 20
	}

	return DeviceHTTPLimits{
		MaxBodyBytes: maxBodyBytes,
	}
}

func (l DeviceHTTPLimits) LimitBody(
	request *http.Request,
) {
	request.Body = http.MaxBytesReader(
		nil,
		request.Body,
		l.MaxBodyBytes,
	)
}
