package service

import "time"

type DeviceHealthSnapshot struct {
	Status    string          `json:"status"`
	Checks    map[string]bool `json:"checks,omitempty"`
	Timestamp time.Time       `json:"timestamp"`
}

func NewDeviceHealthSnapshot(
	status string,
	checks map[string]bool,
) DeviceHealthSnapshot {
	return DeviceHealthSnapshot{
		Status:    status,
		Checks:    checks,
		Timestamp: time.Now(),
	}
}
