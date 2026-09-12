package service

import "net/http"

type DeviceServiceHTTPComposition struct {
	API         *DeviceAPIComposition
	Health      *DeviceServiceHealthRouter
	Diagnostics *DeviceServiceDiagnosticsRouter
	Router      *DeviceServiceAPIRouter
	Handler     http.Handler
}

func NewDeviceServiceHTTPComposition(
	api *DeviceAPIComposition,
	health *DeviceServiceHealthRouter,
	diagnostics *DeviceServiceDiagnosticsRouter,
	authenticator DeviceAuthenticator,
) *DeviceServiceHTTPComposition {
	router := NewDeviceServiceAPIRouter(
		api,
		health,
		diagnostics,
	)

	handler := NewDeviceProductionHTTPMiddleware(
		router.Handler(),
		authenticator,
	)

	return &DeviceServiceHTTPComposition{
		API:         api,
		Health:      health,
		Diagnostics: diagnostics,
		Router:      router,
		Handler:     handler,
	}
}
