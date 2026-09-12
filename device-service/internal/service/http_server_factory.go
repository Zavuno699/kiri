package service

func NewDeviceNetHTTPServerFromHealth(
	config DeviceHTTPServerConfig,
	health *DeviceHealthHTTPComposition,
) *DeviceNetHTTPServer {
	adapter := NewDeviceHealthHTTPAdapter(
		health.Boundary,
	)

	handler := NewDeviceHealthHTTPHandler(
		adapter,
	)

	dispatcher := NewDeviceHealthHTTPDispatcher(
		handler,
	)

	return NewDeviceNetHTTPServer(
		config,
		dispatcher,
	)
}
