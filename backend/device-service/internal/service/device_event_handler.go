package service

import (
	"context"
	"errors"
)

type DeviceServiceEventHandler struct {
	Processor *DeviceEventProcessor
}

func NewDeviceServiceEventHandler(
	processor *DeviceEventProcessor,
) *DeviceServiceEventHandler {
	return &DeviceServiceEventHandler{
		Processor: processor,
	}
}

func (h *DeviceServiceEventHandler) Handle(
	ctx context.Context,
	message DeviceServiceMessage,
) error {
	if h == nil {
		return errors.New("device service event handler is required")
	}
	if ctx == nil {
		return errors.New("context is required")
	}
	if h.Processor == nil {
		return errors.New("device event processor is required")
	}

	return h.Processor.Process(ctx, message)
}
