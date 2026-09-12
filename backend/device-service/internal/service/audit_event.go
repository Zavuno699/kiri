package service

type DeviceAuditEvent struct {
	Subject  string
	Action   string
	DeviceID string
	Success  bool
	Detail   string
}
