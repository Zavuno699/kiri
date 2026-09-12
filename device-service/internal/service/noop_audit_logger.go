package service

import "context"

type NoopDeviceAuditLogger struct{}

func NewNoopDeviceAuditLogger() *NoopDeviceAuditLogger {
	return &NoopDeviceAuditLogger{}
}

func (l *NoopDeviceAuditLogger) Log(
	context.Context,
	DeviceAuditEvent,
) error {
	return nil
}
