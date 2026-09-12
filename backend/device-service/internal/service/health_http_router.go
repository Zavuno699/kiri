package service

type DeviceHealthHTTPRoute struct {
	Method string
	Path   string
}

type DeviceHealthHTTPRouter struct {
	Handler *DeviceHealthHTTPHandler
	Routes  []DeviceHealthHTTPRoute
}

func NewDeviceHealthHTTPRouter(
	handler *DeviceHealthHTTPHandler,
) *DeviceHealthHTTPRouter {
	return &DeviceHealthHTTPRouter{
		Handler: handler,
		Routes: []DeviceHealthHTTPRoute{
			{
				Method: "GET",
				Path:   "/health/live",
			},
			{
				Method: "GET",
				Path:   "/health/ready",
			},
		},
	}
}
