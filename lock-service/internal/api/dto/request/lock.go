package request

type ChangeLockState struct {
	DeviceID string `json:"device_id"`
	State    string `json:"state"`
	Reason   string `json:"reason"`
}

type ExecuteCommand struct {
	DeviceID    string `json:"device_id"`
	CommandType string `json:"command_type"`
	Payload     any    `json:"payload"`
}
