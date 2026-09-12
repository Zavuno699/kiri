package service

func NewDefaultDeviceFinalApplication() *DeviceFinalApplication {
	return NewDeviceFinalApplication(
		NewDefaultDeviceFinalApplicationGraph(),
	)
}
