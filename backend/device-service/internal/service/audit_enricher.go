package service

import "context"

type DeviceAuditEnricher struct{}

func NewDeviceAuditEnricher() *DeviceAuditEnricher {
	return &DeviceAuditEnricher{}
}

func (e *DeviceAuditEnricher) Enrich(
	ctx context.Context,
	event DeviceAuditEvent,
) DeviceAuditEvent {
	if request, ok := DeviceRequestContextFromContext(ctx); ok {
		if event.Detail == "" {
			event.Detail = request.RequestID
		} else {
			event.Detail = request.RequestID + ":" + event.Detail
		}
	}

	if auth, ok := DeviceAuthFromContext(ctx); ok {
		event.Subject = auth.Subject
	}

	return event
}
