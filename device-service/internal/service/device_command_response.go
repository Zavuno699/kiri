package service

type DeviceCommandResponse struct {
	DeviceID string `json:"device_id"`
	Command  string `json:"command"`
	Status   string `json:"status"`
	Payload  []byte `json:"payload,omitempty"`
}
