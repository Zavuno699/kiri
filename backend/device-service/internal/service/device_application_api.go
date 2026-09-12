package service

import "net/http"

type DeviceApplicationAPI struct {
	Routes *DeviceApplicationHTTPRoutes
}

func NewDeviceApplicationAPI(
	routes *DeviceApplicationHTTPRoutes,
) *DeviceApplicationAPI {
	return &DeviceApplicationAPI{
		Routes: routes,
	}
}

func (a *DeviceApplicationAPI) Handler() http.Handler {
	return a.Routes.RoutesHandler()
}
