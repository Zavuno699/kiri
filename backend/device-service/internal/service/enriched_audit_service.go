package service

import "context"

type DeviceEnrichedAuditService struct {
	Audit    *DeviceAuditService
	Enricher *DeviceAuditEnricher
}

func NewDeviceEnrichedAuditService(
	audit *DeviceAuditService,
	enricher *DeviceAuditEnricher,
) *DeviceEnrichedAuditService {
	return &DeviceEnrichedAuditService{
		Audit:    audit,
		Enricher: enricher,
	}
}

func (s *DeviceEnrichedAuditService) Record(
	ctx context.Context,
	event DeviceAuditEvent,
) error {
	return s.Audit.Record(
		ctx,
		s.Enricher.Enrich(ctx, event),
	)
}
