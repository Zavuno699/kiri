package service

import (
	"context"
	"time"
)

type DeviceCommandExecutionService struct {
	Application *DeviceCommandApplication
	Audit       *DeviceAuditService
}

func NewDeviceCommandExecutionService(
	application *DeviceCommandApplication,
	audit *DeviceAuditService,
) *DeviceCommandExecutionService {
	return &DeviceCommandExecutionService{
		Application: application,
		Audit:       audit,
	}
}

func (s *DeviceCommandExecutionService) Execute(
	ctx context.Context,
	request DeviceCommandRequest,
) (DeviceCommandExecutionResult, error) {
	startedAt := time.Now()

	requestContext := DeviceCommandExecutionContext{
		Context:   ctx,
		StartedAt: startedAt,
	}

	result, err := s.Application.Execute(
		requestContext.Context,
		request,
	)

	finishedAt := time.Now()

	status := "ok"
	if err != nil {
		status = "failed"
	}

	if s.Audit != nil {
		_ = s.Audit.Record(
			ctx,
			DeviceAuditEvent{
				Action:   request.Command,
				DeviceID: request.DeviceID,
				Success:  err == nil,
				Detail:   status,
			},
		)
	}

	execution := DeviceCommandExecutionResult{
		DeviceID:   request.DeviceID,
		Command:    request.Command,
		Status:     status,
		RequestID:  requestContext.RequestID,
		StartedAt:  startedAt,
		FinishedAt: finishedAt,
	}

	if err == nil {
		execution.Payload = result.Payload
	}

	return execution, err
}
