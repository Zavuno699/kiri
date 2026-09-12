package service

import "context"

type DeviceHealthHTTPComposition struct {
	Boundary    *DeviceHealthHTTPBoundary
	Application *DeviceHealthHTTPApplication
}

func NewDeviceHealthHTTPComposition(
	runtime *DeviceRuntimeHealth,
) *DeviceHealthHTTPComposition {

	healthBoundary := NewDeviceHealthBoundary(runtime)

	healthComposition := NewDeviceHealthComposition(
		healthBoundary,
	)

	readiness := NewDeviceHealthReadiness(
		healthComposition.Aggregator,
	)

	httpBoundary := NewDeviceHealthHTTPBoundary(
		readiness,
	)

	adapter := NewDeviceHealthHTTPAdapter(
		httpBoundary,
	)

	handler := NewDeviceHealthHTTPHandler(
		adapter,
	)

	router := NewDeviceHealthHTTPRouter(
		handler,
	)

	server := NewDeviceHealthHTTPServerComposition(
		router,
	)

	lifecycle := NewDeviceHealthHTTPLifecycle(
		server,
	)

	httpRuntime := NewDeviceHealthHTTPRuntime(
		lifecycle,
	)

	bootstrap := NewDeviceHealthHTTPBootstrap(
		httpRuntime,
	)

	application := NewDeviceHealthHTTPApplication(
		bootstrap,
	)

	return &DeviceHealthHTTPComposition{
		Boundary:    httpBoundary,
		Application: application,
	}
}

func NewDeviceHealthHTTPCompositionBoundary(
	application *DeviceHealthHTTPApplication,
) *DeviceHealthHTTPComposition {
	return &DeviceHealthHTTPComposition{
		Application: application,
	}
}

func (c *DeviceHealthHTTPComposition) Start(
	ctx context.Context,
) error {
	return c.Application.Start(ctx)
}

func (c *DeviceHealthHTTPComposition) Stop(
	ctx context.Context,
) error {
	return c.Application.Stop(ctx)
}
