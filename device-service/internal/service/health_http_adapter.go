package service

type DeviceHealthHTTPResult struct {
	Code   int
	Status string
	Checks map[string]bool
}

type DeviceHealthHTTPAdapter struct {
	boundary *DeviceHealthHTTPBoundary
}

func NewDeviceHealthHTTPAdapter(
	boundary *DeviceHealthHTTPBoundary,
) *DeviceHealthHTTPAdapter {
	return &DeviceHealthHTTPAdapter{
		boundary: boundary,
	}
}

func (a *DeviceHealthHTTPAdapter) Liveness() DeviceHealthHTTPResult {
	response := a.boundary.Liveness()

	if response.Status == "ok" {
		return DeviceHealthHTTPResult{
			Code:   200,
			Status: response.Status,
		}
	}

	return DeviceHealthHTTPResult{
		Code:   503,
		Status: response.Status,
	}
}

func (a *DeviceHealthHTTPAdapter) Readiness() (DeviceHealthHTTPResult, error) {
	response, err := a.boundary.Readiness()

	if err != nil {
		return DeviceHealthHTTPResult{}, err
	}

	if response.Status == "ok" {
		return DeviceHealthHTTPResult{
			Code:   200,
			Status: response.Status,
			Checks: response.Checks,
		}, nil
	}

	return DeviceHealthHTTPResult{
		Code:   503,
		Status: response.Status,
		Checks: response.Checks,
	}, nil
}
