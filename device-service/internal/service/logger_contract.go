package service

type DeviceServiceLogger interface {
	Info(string)
	Error(string)
}
