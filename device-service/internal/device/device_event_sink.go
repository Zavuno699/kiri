package device

import "context"

type EventSinkAdapter struct {
	Sink EventSink
}

func NewEventSinkAdapter(
	sink EventSink,
) *EventSinkAdapter {
	return &EventSinkAdapter{
		Sink: sink,
	}
}

func (a *EventSinkAdapter) DeviceConnected(
	ctx context.Context,
	deviceID string,
) error {
	return a.Sink.Publish(
		ctx,
		Event{
			DeviceID: deviceID,
			Type:     "device.connected",
		},
	)
}

func (a *EventSinkAdapter) DeviceDisconnected(
	ctx context.Context,
	deviceID string,
) error {
	return a.Sink.Publish(
		ctx,
		Event{
			DeviceID: deviceID,
			Type:     "device.disconnected",
		},
	)
}
