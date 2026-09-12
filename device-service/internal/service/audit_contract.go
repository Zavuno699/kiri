package service

import "context"

type DeviceAuditLogger interface {
	Log(context.Context, DeviceAuditEvent) error
}
