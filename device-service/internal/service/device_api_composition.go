package service

import "net/http"

type DeviceAPIComposition struct {
	Services *DeviceApplicationAPIServices
	API      *DeviceApplicationHTTPV2
	Router   *DeviceApplicationAPIRouter
}

func NewDeviceAPIComposition(
	services *DeviceApplicationAPIServices,
) *DeviceAPIComposition {
	api := NewDeviceApplicationHTTPV2(services)

	return &DeviceAPIComposition{
		Services: services,
		API:      api,
		Router:   NewDeviceApplicationAPIRouter(api),
	}
}

func (c *DeviceAPIComposition) Handler() http.Handler {
	return NewDeviceHTTPMiddleware(
		c.Router,
	)
}
