package messaging

import (
	"context"
	"encoding/json"
	"errors"
	"strings"

	"github.com/kirilock/backend/device-service/internal/service"
)

func NewDeviceDomainRoutes(
	handler *service.DeviceServiceEventHandler,
) []EventRoute {
	if handler == nil {
		return nil
	}

	makeHandler := func(topic string) EventDispatchHandler {
		return func(
			ctx context.Context,
			envelope EventEnvelope,
		) error {
			if ctx == nil {
				return errors.New("context is required")
			}

			aggregateID := strings.TrimSpace(envelope.AggregateID)
			if aggregateID == "" {
				return errors.New("aggregate ID is required")
			}

			var payload []byte
			if envelope.Data != nil {
				encoded, err := json.Marshal(envelope.Data)
				if err != nil {
					return err
				}
				payload = encoded
			}

			return handler.Handle(
				ctx,
				service.DeviceServiceMessage{
					Topic:   topic,
					Key:     aggregateID,
					Payload: payload,
				},
			)
		}
	}

	return []EventRoute{
		{
			EventType: "device.connected",
			Topic:     "device.connected",
			Handler:   makeHandler("device.connected"),
		},
		{
			EventType: "device.disconnected",
			Topic:     "device.disconnected",
			Handler:   makeHandler("device.disconnected"),
		},
		{
			EventType: "device.command.failed",
			Topic:     "device.command.failed",
			Handler:   makeHandler("device.command.failed"),
		},
		{
			EventType: "device.command.completed",
			Topic:     "device.command.completed",
			Handler:   makeHandler("device.command.completed"),
		},
	}
}
