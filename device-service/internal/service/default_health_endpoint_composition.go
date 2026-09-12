package service

func NewDefaultDeviceHealthEndpointComposition(
	runtime *DeviceRuntimeState,
	integration *DeviceServiceIntegrationRuntime,
) *DeviceHealthEndpointComposition {
	liveness := NewDeviceLivenessHandler(
		NewDeviceLivenessService(),
	)

	readiness := NewDeviceReadinessHandler(
		NewDeviceReadinessService(
			runtime,
			integration,
		),
	)

	return NewDeviceHealthEndpointComposition(
		liveness,
		readiness,
	)
}
