package service

func NewDefaultDeviceDiagnosticsRoutes(
	dependencies *DeviceServiceDependencies,
	state *DeviceRuntimeState,
	integration *DeviceServiceIntegrationRuntime,
) *DeviceDiagnosticsRoutes {
	graph := NewDefaultDeviceObservabilityGraph(
		dependencies.Logger,
		state,
	)

	diagnostics := NewDeviceDiagnostics(
		dependencies,
		state,
		integration,
	)

	return NewDeviceDiagnosticsRoutes(
		NewDeviceDiagnosticsHandler(diagnostics),
		NewDeviceMetricsHandler(graph.MetricsRegistry),
	)
}
