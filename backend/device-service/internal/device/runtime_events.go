package device

import "context"

type RuntimeEvents struct {
	Sink  EventSink
	State *State
}

func NewRuntimeEvents(
	sink EventSink,
	state *State,
) *RuntimeEvents {
	return &RuntimeEvents{
		Sink:  sink,
		State: state,
	}
}

func (e *RuntimeEvents) Connected(
	ctx context.Context,
) error {
	return e.Sink.Publish(
		ctx,
		Event{
			DeviceID: e.State.DeviceID(),
			Type:     "device.connected",
		},
	)
}

func (e *RuntimeEvents) Disconnected(
	ctx context.Context,
) error {
	return e.Sink.Publish(
		ctx,
		Event{
			DeviceID: e.State.DeviceID(),
			Type:     "device.disconnected",
		},
	)
}
