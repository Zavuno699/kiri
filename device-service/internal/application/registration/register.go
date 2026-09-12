package registration

type RegisterDeviceCommand struct {
	DeviceID string
	TenantID string
	Serial   string
	Model    string
}
