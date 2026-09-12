package service

import "context"

type deviceAuditContextKey struct{}

func WithDeviceAuditContext(
	ctx context.Context,
	event DeviceAuditEvent,
) context.Context {
	return context.WithValue(
		ctx,
		deviceAuditContextKey{},
		event,
	)
}

func DeviceAuditContextFromContext(
	ctx context.Context,
) (DeviceAuditEvent, bool) {
	value := ctx.Value(deviceAuditContextKey{})

	event, ok := value.(DeviceAuditEvent)
	return event, ok
}
