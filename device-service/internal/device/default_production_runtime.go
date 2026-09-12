package device

import "context"

type noopEventSink struct{}

func (noopEventSink) Publish(
	_ context.Context,
	_ Event,
) error {
	return nil
}
