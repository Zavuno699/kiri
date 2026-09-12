package service

import "net/http"

type DeviceProductionHTTPHandler struct {
	Composition *DeviceServiceHTTPComposition
}

func NewDeviceProductionHTTPHandler(
	composition *DeviceServiceHTTPComposition,
) *DeviceProductionHTTPHandler {
	return &DeviceProductionHTTPHandler{
		Composition: composition,
	}
}

func (h *DeviceProductionHTTPHandler) Handler() http.Handler {
	return h.Composition.Handler
}
