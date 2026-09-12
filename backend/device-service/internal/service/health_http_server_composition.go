package service

import "context"

type DeviceHealthHTTPServerComposition struct {
	Router *DeviceHealthHTTPRouter
}

func NewDeviceHealthHTTPServerComposition(
	router *DeviceHealthHTTPRouter,
) *DeviceHealthHTTPServerComposition {
	return &DeviceHealthHTTPServerComposition{
		Router: router,
	}
}

func (s *DeviceHealthHTTPServerComposition) Start(
	context.Context,
) error {
	// Listener binding intentionally deferred.
	// Router ownership is already established.
	return nil
}

func (s *DeviceHealthHTTPServerComposition) Stop(
	context.Context,
) error {
	// Listener shutdown intentionally deferred.
	return nil
}
