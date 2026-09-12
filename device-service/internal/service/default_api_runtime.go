package service

import "net/http"

func NewDefaultDeviceAPIRuntime(
	handler http.Handler,
	address string,
) *DeviceAPIRuntime {
	server := NewDeviceServiceAPIServer(
		address,
		handler,
	)

	lifecycle := NewDeviceAPIServerLifecycle(
		server,
	)

	application := NewDeviceAPIApplication(
		lifecycle,
	)

	owner := NewDeviceAPIApplicationOwner(
		application,
	)

	return NewDeviceAPIRuntime(
		owner,
	)
}
