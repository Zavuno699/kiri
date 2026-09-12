package request

type CreateDevice struct {
	DeviceID string `json:"device_id"`
	TenantID string `json:"tenant_id"`
	Serial   string `json:"serial"`
	Model    string `json:"model"`
}

type ExecuteCommand struct {
	DeviceID    string `json:"device_id"`
	CommandType string `json:"command_type"`
	Payload     any    `json:"payload"`
}
