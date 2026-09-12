package service

import (
	"fmt"
	"net/http"
)

type DeviceMetricsHandler struct {
	Registry *DeviceMetricsRegistry
}

func NewDeviceMetricsHandler(
	registry *DeviceMetricsRegistry,
) *DeviceMetricsHandler {
	return &DeviceMetricsHandler{
		Registry: registry,
	}
}

func (h *DeviceMetricsHandler) ServeHTTP(
	writer http.ResponseWriter,
	_ *http.Request,
) {
	writer.Header().Set(
		"Content-Type",
		"text/plain; version=0.0.4",
	)

	fmt.Fprintf(
		writer,
		"device_service_runtime_started %d\n",
		h.Registry.Value("runtime_started"),
	)

	fmt.Fprintf(
		writer,
		"device_service_runtime_stopped %d\n",
		h.Registry.Value("runtime_stopped"),
	)
}
