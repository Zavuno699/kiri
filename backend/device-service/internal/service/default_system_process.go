package service

func NewDefaultDeviceSystemProcess() *DeviceSystemProcess {
	return NewDeviceSystemProcess(
		NewDeviceSystemOwner(
			NewDefaultDeviceSystemApplication(),
		),
	)
}
