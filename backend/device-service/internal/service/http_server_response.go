package service

type DeviceHTTPJSONResponse struct {
	Status string          `json:"status"`
	Checks map[string]bool `json:"checks,omitempty"`
}
