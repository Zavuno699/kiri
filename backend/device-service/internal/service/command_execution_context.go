package service

import (
	"context"
	"time"
)

type DeviceCommandExecutionContext struct {
	Context   context.Context
	RequestID string
	StartedAt time.Time
}

func NewDeviceCommandExecutionContext(
	ctx context.Context,
	requestID string,
) *DeviceCommandExecutionContext {
	return &DeviceCommandExecutionContext{
		Context:   ctx,
		RequestID: requestID,
		StartedAt: time.Now(),
	}
}
