package service

type DeviceServiceMetrics interface {
	Increment(string)
}
