package service

import "context"

type DeviceAuditService struct {
	Logger DeviceAuditLogger
}

func NewDeviceAuditService(
	logger DeviceAuditLogger,
) *DeviceAuditService {
	return &DeviceAuditService{
		Logger: logger,
	}
}

func (s *DeviceAuditService) Record(
	ctx context.Context,
	event DeviceAuditEvent,
) error {
	return s.Logger.Log(ctx, event)
}
