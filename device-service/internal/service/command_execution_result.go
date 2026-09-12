package service

import "time"

type DeviceCommandExecutionResult struct {
	DeviceID   string
	Command    string
	Status     string
	Payload    []byte
	RequestID  string
	StartedAt  time.Time
	FinishedAt time.Time
}
