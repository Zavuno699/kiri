package service

type DeviceCommandRequest struct {
	DeviceID string `json:"device_id"`
	Command  string `json:"command"`
	Payload  []byte `json:"payload,omitempty"`
}
