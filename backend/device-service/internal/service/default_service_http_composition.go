package service

func NewDefaultDeviceServiceHTTPComposition(
	integrations *DeviceServiceCoreIntegrations,
	runtimeHealth *DeviceRuntimeHealth,
	state *DeviceRuntimeState,
) *DeviceServiceHTTPComposition {
	api := NewDefaultDeviceAPIComposition(
		integrations,
	)

	healthObserver := NewDeviceHealthRuntimeObserver(
		state,
	)

	health := NewDeviceServiceHealthRouter(
		NewDeviceServiceHealthRoutes(
			healthObserver,
		),
	)

	diagnosticsDependencies := NewDefaultDeviceServiceDependencies(
		DeviceServiceConfig{},
	)

	diagnosticsIntegration := NewDefaultDeviceServiceIntegrationRuntime(
		diagnosticsDependencies,
	)

	diagnostics := NewDeviceServiceDiagnosticsRouter(
		NewDefaultDeviceDiagnosticsRoutes(
			diagnosticsDependencies,
			state,
			diagnosticsIntegration,
		),
	)

	return NewDeviceServiceHTTPComposition(
		api,
		health,
		diagnostics,
		NewNoopDeviceAuthenticator(),
	)
}
