package service

import "net/http"

type DeviceHealthEndpointComposition struct {
	Liveness  http.Handler
	Readiness http.Handler
}

func NewDeviceHealthEndpointComposition(
	liveness http.Handler,
	readiness http.Handler,
) *DeviceHealthEndpointComposition {
	return &DeviceHealthEndpointComposition{
		Liveness:  liveness,
		Readiness: readiness,
	}
}

func (c *DeviceHealthEndpointComposition) Handler() http.Handler {
	mux := http.NewServeMux()

	mux.Handle(
		"/health/live",
		c.Liveness,
	)

	mux.Handle(
		"/health/ready",
		c.Readiness,
	)

	return mux
}
