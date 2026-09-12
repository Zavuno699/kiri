package registration

type Request struct {
	DeviceID   string
	Serial     string
	Model      string
	TenantID   string
	Properties map[string]string
}
