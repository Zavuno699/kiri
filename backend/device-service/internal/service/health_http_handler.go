package service

type DeviceHealthHTTPHandlerResponse struct {
	Code   int
	Body   string
	Checks map[string]bool
}

type DeviceHealthHTTPHandler struct {
	adapter *DeviceHealthHTTPAdapter
}

func NewDeviceHealthHTTPHandler(
	adapter *DeviceHealthHTTPAdapter,
) *DeviceHealthHTTPHandler {
	return &DeviceHealthHTTPHandler{
		adapter: adapter,
	}
}

func (h *DeviceHealthHTTPHandler) Liveness() DeviceHealthHTTPHandlerResponse {
	response := h.adapter.Liveness()

	return DeviceHealthHTTPHandlerResponse{
		Code: response.Code,
		Body: response.Status,
	}
}

func (h *DeviceHealthHTTPHandler) Readiness() (DeviceHealthHTTPHandlerResponse, error) {
	response, err := h.adapter.Readiness()

	if err != nil {
		return DeviceHealthHTTPHandlerResponse{}, err
	}

	return DeviceHealthHTTPHandlerResponse{
		Code:   response.Code,
		Body:   response.Status,
		Checks: response.Checks,
	}, nil
}
