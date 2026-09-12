package service

import "net/http"

type DeviceApplicationV1Composition struct {
	Services *DeviceApplicationAPIServices
	Router   *DeviceApplicationV1Router
}

func NewDeviceApplicationV1Composition(
	services *DeviceApplicationAPIServices,
) *DeviceApplicationV1Composition {
	router := NewDeviceApplicationV1Router(
		NewDeviceQueryHandlerV2(
			services.Query,
		),
		NewDeviceRegistrationHandler(
			services.Registration,
		),
		NewDeviceStatusHandler(
			services.Status,
		),
		NewDeviceCommandRequestHandler(
			NewDefaultDeviceCommandWorkerRuntime(
				&DeviceServiceCoreIntegrations{},
			),
		),
	)

	return &DeviceApplicationV1Composition{
		Services: services,
		Router:   router,
	}
}

func (c *DeviceApplicationV1Composition) Handler() http.Handler {
	return c.Router.Handler()
}
