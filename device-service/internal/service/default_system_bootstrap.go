package service

func NewDefaultDeviceSystemBootstrap() *DeviceSystemBootstrap {
	return NewDeviceSystemBootstrap(
		NewDefaultDeviceSystemComposition(),
	)
}
