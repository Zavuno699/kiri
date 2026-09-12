package service

type DeviceHealthHTTPResponse struct {
	Status string
	Checks map[string]bool
}

type DeviceHealthHTTPBoundary struct {
	health *DeviceHealthReadiness
}

func NewDeviceHealthHTTPBoundary(
	health *DeviceHealthReadiness,
) *DeviceHealthHTTPBoundary {
	return &DeviceHealthHTTPBoundary{
		health: health,
	}
}

func (h *DeviceHealthHTTPBoundary) Liveness() DeviceHealthHTTPResponse {
	report := h.health.Liveness()

	if report.Alive {
		return DeviceHealthHTTPResponse{
			Status: "ok",
		}
	}

	return DeviceHealthHTTPResponse{
		Status: "failed",
	}
}

func (h *DeviceHealthHTTPBoundary) Readiness() (DeviceHealthHTTPResponse, error) {
	report, err := h.health.Readiness()

	if err != nil {
		return DeviceHealthHTTPResponse{}, err
	}

	status := "failed"

	if report.Ready {
		status = "ok"
	}

	return DeviceHealthHTTPResponse{
		Status: status,
		Checks: report.Checks,
	}, nil
}
