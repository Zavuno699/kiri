package service

func NewDefaultDeviceOperationalSystem(
	config DeviceServiceConfig,
) *DeviceOperationalSystem {

	entry := NewDefaultDeviceOperationalEntry(
		config,
	)

	return NewDeviceOperationalSystem(
		entry,
	)
}
