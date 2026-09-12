package response

type LockState struct {
	DeviceID string `json:"device_id"`
	State    string `json:"state"`
	Version  int64  `json:"version"`
}
