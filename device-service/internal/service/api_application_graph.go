package service

type DeviceAPIApplicationGraph struct {
	Composition *DeviceApplicationV1Composition
	Router      *DeviceAPIRootRouter
	Handler     DeviceAPIHTTPHandler
}

type DeviceAPIHTTPHandler interface {
	ServeHTTP(
		writer interface{},
		request interface{},
	)
}
