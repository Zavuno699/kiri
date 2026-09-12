package service

func NewDefaultDeviceFinalHTTPComposition(
	integrations *DeviceServiceCoreIntegrations,
	state *DeviceRuntimeState,
	runtimeHealth *DeviceRuntimeHealth,
) *DeviceFinalHTTPComposition {
	api := NewDefaultDeviceAPIProductionGraph(
		integrations,
	)

	health := NewDeviceServiceHealthRouter(
		NewDeviceServiceHealthRoutes(
			NewDeviceHealthRuntimeObserver(state),
		),
	)

	diagnostics := NewDefaultDeviceDiagnosticsRoutes(
		NewDefaultDeviceServiceDependencies(
			DeviceServiceConfig{},
		),
		state,
		NewDefaultDeviceServiceIntegrationRuntime(
			NewDefaultDeviceServiceDependencies(
				DeviceServiceConfig{},
			),
		),
	)

	diagnosticsRouter := NewDeviceServiceDiagnosticsRouter(
		diagnostics,
	)

	observability := NewDefaultDeviceObservabilityGraph(
		NewDefaultDeviceServiceLogger(),
		state,
	)

	metrics := NewDeviceMetricsHandler(
		observability.MetricsRegistry,
	)

	return NewDeviceFinalHTTPComposition(
		NewDeviceFinalHTTPRoutes(
			api.Router.Handler(),
			health.Handler(),
			diagnosticsRouter.Handler(),
			metrics,
		),
	)
}
