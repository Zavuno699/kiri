package service

import "time"

func NewDefaultDeviceFinalProcess() *DeviceFinalProcess {
	return NewDeviceFinalProcess(
		NewDefaultDeviceFinalApplication(),
		NewDeviceGracefulShutdown(
			30*time.Second,
		),
	)
}
