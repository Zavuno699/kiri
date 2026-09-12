package service

func NewProductionHealthHTTPRuntime(
	runtimeHealth *DeviceRuntimeHealth,
) *DeviceHealthHTTPRuntime {
	bootstrap := NewDefaultDeviceHealthHTTPProduction(
		runtimeHealth,
	)

	lifecycle := NewDeviceHealthHTTPLifecycle(
		bootstrap,
	)

	return NewDeviceHealthHTTPRuntime(
		lifecycle,
	)
}
