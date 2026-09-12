package service

import (
	"context"
	"errors"
)

type DeviceEventProcessor struct {
	Repository DeviceServiceEventRepository
	Status     *DeviceStatusService
}

func NewDeviceEventProcessor(
	repository DeviceServiceEventRepository,
	status *DeviceStatusService,
) *DeviceEventProcessor {
	return &DeviceEventProcessor{
		Repository: repository,
		Status:     status,
	}
}

func (p *DeviceEventProcessor) Process(
	ctx context.Context,
	message DeviceServiceMessage,
) error {
	if p == nil {
		return errors.New("device event processor is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if p.Repository == nil {
		return errors.New("device event repository is required")
	}
	if p.Status == nil {
		return errors.New("device status service is required")
	}
	if message.Topic == "" {
		return errors.New("device event topic is required")
	}
	if message.Key == "" {
		return errors.New("device event key is required")
	}

	var nextStatus string

	switch message.Topic {
	case "device.connected":
		nextStatus = "ready"

	case "device.disconnected":
		nextStatus = "disconnected"

	case "device.command.failed":
		nextStatus = "failed"

	case "device.command.completed":
		nextStatus = "ready"

	default:
		return errors.New("unsupported device event topic: " + message.Topic)
	}

	if err := p.Repository.Append(ctx, message); err != nil {
		return err
	}

	return p.Status.Update(ctx, message.Key, nextStatus)
}
