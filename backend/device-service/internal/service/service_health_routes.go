package service

import (
	"encoding/json"
	"net/http"
)

type DeviceServiceHealthRoutes struct {
	Observer *DeviceHealthRuntimeObserver
}

func NewDeviceServiceHealthRoutes(
	observer *DeviceHealthRuntimeObserver,
) *DeviceServiceHealthRoutes {
	return &DeviceServiceHealthRoutes{
		Observer: observer,
	}
}

func (r *DeviceServiceHealthRoutes) Liveness(
	writer http.ResponseWriter,
	_ *http.Request,
) {
	writeDeviceApplicationJSON(
		writer,
		http.StatusOK,
		map[string]any{
			"status": "ok",
		},
	)
}

func (r *DeviceServiceHealthRoutes) Readiness(
	writer http.ResponseWriter,
	_ *http.Request,
) {
	snapshot := r.Observer.Snapshot()

	status := http.StatusServiceUnavailable

	if snapshot.Status == "ready" {
		status = http.StatusOK
	}

	writer.Header().Set(
		"Content-Type",
		"application/json",
	)

	writer.WriteHeader(status)

	_ = json.NewEncoder(writer).Encode(snapshot)
}
